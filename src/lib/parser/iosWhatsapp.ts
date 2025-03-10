import type { Message, TextMessage } from './types';
import { parseSpecialMessage } from '$lib/parser/iosWhatsappSpecial';
import { MSG_EDITED_END_ENGLISH } from '$lib/constants/whatsapp';
import { parse } from '@devsnowflake/text-emoji-parser';

const regex =
	/.?\[(\d{2}.\d{2}.\d{2}, \d{2}:\d{2}:\d{2})\] (([^:]+)|(@[a-z]+:[a-z]+\.[a-z]+)):(.*)/s;

const SPECIAL_CHAR = String.fromCharCode(8206);

// for easier multi language support
const isEditedWithPostfix = (message: string, postfix: string) => {
	return message.endsWith(SPECIAL_CHAR + postfix);
};

const isEdited = (message: string): [boolean, number] => {
	if (isEditedWithPostfix(message, MSG_EDITED_END_ENGLISH)) {
		return [true, 1 + MSG_EDITED_END_ENGLISH.length];
	}
	return [false, 0];
};

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

		const isSpecialMsg = message === SPECIAL_CHAR;

		const specialResult = isSpecialMsg
			? parseSpecialMessage({
					date,
					author,
					message: message.slice(2)
				})
			: null;

		const [msgIsEdited, postfixLength] = isEdited(message);
		const msgContent = postfixLength > 0 ? message.slice(0, -postfixLength) : message;

		const textMsg: TextMessage = {
			date,
			author,
			message: msgContent,
			isEdited: msgIsEdited,
			type: 'message'
		};
		return specialResult ?? textMsg;
	}) satisfies Message[];

	return messages;
}
