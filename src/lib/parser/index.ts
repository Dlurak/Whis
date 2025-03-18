import { isAndroidWhatsappChat, parseAndroid } from './androidWhatsapp';
import { decodeElementChat, parseElement } from './element';
import { isIosWhatsappChat, parseIos } from './iosWhatsapp';

export function parse(chat: string) {
	const elementDecoded = decodeElementChat(chat);
	if (elementDecoded[1]) return parseElement(elementDecoded[0]);

	if (isIosWhatsappChat(chat)) return parseIos(chat);
	if (isAndroidWhatsappChat(chat)) return parseAndroid(chat);

	throw new Error('Unparsable');
}
