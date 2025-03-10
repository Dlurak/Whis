import { z } from 'zod';
import type { Message } from './types';

const getJsonEncoded = <T>(data: string) => {
	try {
		return [JSON.parse(data) as T, true] as const;
	} catch {
		return [null, false] as const;
	}
};

const contentScheme = z.object({
	body: z.string(),
	msgtype: z.union([
		z.literal('m.text'),
		z.literal('m.file'),
		z.literal('m.video'),
		z.literal('m.audio'),
		z.literal('m.image'),
		z.literal('m.emote'),
		z.literal('m.location')
	])
});

const goodMsgScheme = z.object({
	content: contentScheme,
	origin_server_ts: z.number(),
	sender: z.string(),
	type: z.literal('m.room.message')
});

const msgScheme = z.union([
	goodMsgScheme,
	z.object({
		content: z.union([
			z.object({
				membership: z.string(),
				displayname: z.string(),
				avatar_url: z.string()
			}),
			z.object({
				lifetime: z.number(),
				offer: z.object({ type: z.literal('offer') }),
				capabilities: z.object({})
			}),
			z.object({ 'org.matrix.msc3381.poll.start': z.object({}) }),
			z.object({ 'org.matrix.msc3381.poll.end': z.object({}) }),
			z.object({ 'org.matrix.msc3765.topic': z.array(z.object({})) }),
			z.object({ join_rule: z.string() }),
			z.object({ name: z.string() }),
			z.object({ topic: z.string() }),
			z.object({ history_visibility: z.string() }),
			z.object({ guest_access: z.string() }),
			z.object({ algorithm: z.string() })
		]),
		origin_server_ts: z.number(),
		sender: z.string()
	}),
	z.object({ redacted_because: z.object({}) }),
	z.object({ type: z.literal('m.room.encrypted') })
]);

const scheme = z.object({ messages: z.array(msgScheme) });

export function isElementChat(chat: string) {
	const encoded = getJsonEncoded(chat);
	if (!encoded[1]) return false;

	console.log(scheme.safeParse(encoded[0]));
	return scheme.safeParse(encoded[0]).success;
}

export function parseElement(chat: string) {
	const encoded = JSON.parse(chat);
	const parsed = scheme.parse(encoded).messages;

	const messages = parsed.map((msg) => {
		const res = goodMsgScheme.safeParse(msg);
		if (!res.success) return null;

		const { data } = res;

		const baseReturn = {
			date: new Date(data.origin_server_ts),
			author: data.sender
		};

		switch (data.content.msgtype) {
			case 'm.text':
				return { ...baseReturn, isEdited: false, type: 'message', message: data.content.body };
			case 'm.video':
				return { ...baseReturn, type: 'video' };
			case 'm.audio':
				return { ...baseReturn, type: 'audio' };
			case 'm.image':
				return { ...baseReturn, type: 'image' };
		}

		return null;
	}) satisfies (null | Message)[];

	return messages.filter((m) => m !== null) as Message[];
}
