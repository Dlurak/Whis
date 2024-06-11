import type { Message } from './types';
import { parseSpecialMessage } from '$lib/parser/iosWhatsappSpecial';

const regex =
	/.?\[(\d{2}.\d{2}.\d{2}, \d{2}:\d{2}:\d{2})\] (([^:]+)|(@[a-z]+:[a-z]+\.[a-z]+)):(.*)/s;

export function isIosWhatsappChat(chat: string) {
	const msgStrings = chat.split('\r\n').filter((i) => i);

	return msgStrings.every((s) => regex.test(s));
}

export function parseIos(chat: string) {
	const msgStrings = chat.split('\r\n').filter((i) => i);

	const messages = msgStrings.map((msg) => {
		const match = msg.match(regex);
		if (!match) {
			throw new Error('uprocessable');
		}

		const [_, dateStr, author, __, ___, message] = match;

		const parts = dateStr.split(/[.,: ]+/);

		const date = new Date(
			parseInt(parts[2]) + 2000,
			parseInt(parts[1]) - 1,
			parseInt(parts[0]),
			parseInt(parts[3]),
			parseInt(parts[4]),
			parseInt(parts[5])
		);

		const isSpecialMsg = message.charCodeAt(1) === 8206;

		const specialResult = isSpecialMsg
			? parseSpecialMessage({
					date,
					author,
					message: message.slice(2)
				})
			: null;

		return specialResult ?? { date, author, message, type: 'message' };
	}) satisfies Message[];

	return messages;
}
