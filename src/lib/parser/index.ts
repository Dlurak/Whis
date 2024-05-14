import { isAndroidWhatsappChat, parseAndroid } from './androidWhatsapp';
import { isElementChat, parseElement } from './element';
import { isIosWhatsappChat, parseIos } from './iosWhatsapp';

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

export function parse(chat: string) {
	if (isAndroidWhatsappChat(chat)) return parseAndroid(chat);
	if (isIosWhatsappChat(chat)) return parseIos(chat);
	if (isElementChat(chat)) return parseElement(chat);

	throw new Error('Unparsable');
}
