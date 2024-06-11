import { isAndroidWhatsappChat, parseAndroid } from './androidWhatsapp';
import { isElementChat, parseElement } from './element';
import { isIosWhatsappChat, parseIos } from './iosWhatsapp';

export function parse(chat: string) {
	if (isAndroidWhatsappChat(chat)) return parseAndroid(chat);
	if (isIosWhatsappChat(chat)) return parseIos(chat);
	if (isElementChat(chat)) return parseElement(chat);

	throw new Error('Unparsable');
}
