import {
	AUDIO_OMITTED_ENGLISH,
	AUDIO_OMITTED_GERMAN,
	END_TO_END_ENCRYPTED_ENGLISH,
	END_TO_END_ENCRYPTED_GERMAN,
	GIF_OMITTED_ENGLISH,
	GIF_OMITTED_GERMAN,
	IMAGE_OMITED_ENGLISH,
	IMAGE_OMITED_GERMAN,
	STICKER_OMITTED_ENGLISH,
	STICKER_OMITTED_GERMAN,
	THIS_MSG_WAS_DEL_ENGLISH,
	THIS_MSG_WAS_DEL_GERMAN,
	VIDEO_OMITTED_ENGLISH,
	VIDEO_OMITTED_GERMAN,
	YOU_DELETED_THIS_MSG_ENGLISH,
	YOU_DELETED_THIS_MSG_GERMAN
} from '$lib/constants/whatsapp';

const regex =
	/.?\[(\d{2}.\d{2}.\d{2}, \d{2}:\d{2}:\d{2})\] (([^:]+)|(@[a-z]+:[a-z]+\.[a-z]+)):(.*)/s;

export function parse(chat: string) {
	const msgStrings = chat.split('\r\n').filter((i) => i);

	const messages = msgStrings.map((msg) => {
		const match = msg.match(regex);
		if (!match) {
			console.log(msg);
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

		if (isSpecialMsg) {
			switch (message.slice(2)) {
				case END_TO_END_ENCRYPTED_ENGLISH:
				case END_TO_END_ENCRYPTED_GERMAN:
					return { type: 'end-to-end', date, author };
				case IMAGE_OMITED_ENGLISH:
				case IMAGE_OMITED_GERMAN:
					return { type: 'image', date, author };
				case AUDIO_OMITTED_ENGLISH:
				case AUDIO_OMITTED_GERMAN:
					return { type: 'audio', date, author };
				case YOU_DELETED_THIS_MSG_ENGLISH:
				case YOU_DELETED_THIS_MSG_GERMAN:
				case THIS_MSG_WAS_DEL_ENGLISH:
				case THIS_MSG_WAS_DEL_GERMAN:
					return { type: 'deleted', date, author };
				case STICKER_OMITTED_ENGLISH:
				case STICKER_OMITTED_GERMAN:
					return { type: 'sticker', date, author };
				case GIF_OMITTED_ENGLISH:
				case GIF_OMITTED_GERMAN:
					return { type: 'gif', date, author };
				case VIDEO_OMITTED_ENGLISH:
				case VIDEO_OMITTED_GERMAN:
					return { type: 'video', date, author };
			}
		}

		return { date, author, message, type: 'message' };
	}) satisfies Message[];

	return messages;
}

export type TextMessage = {
	type: 'message';
	date: Date;
	author: string;
	message: string;
};

export type SpecialMsg = {
	type: 'sticker' | 'gif' | 'image' | 'video' | 'audio' | 'deleted' | 'end-to-end';
	date: Date;
	author: string;
};

export type Message = TextMessage | SpecialMsg;
