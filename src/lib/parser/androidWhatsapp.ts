import type { Message } from './types';

const regex =
	/^(\d{2}\.\d{2}\.\d{2}, \d{2}:\d{2}) - (?:([^\n:]*):)? (.*?)(?=^\d{2}\.\d{2}\.\d{2}, \d{2}:\d{2} - )/gms;
const totalRegex =
	/(^(\d{2}\.\d{2}\.\d{2}, \d{2}:\d{2}) - (?:([^\n:]*):)?(.*?)(?=^\d{2}\.\d{2}\.\d{2}, \d{2}:\d{2} - ))\d{2}\.\d{2}\.\d{2}, \d{2}:\d{2} - $/gms;

export function isAndroidWhatsappChat(chat: string) {
	const formattedChat = chat + '\n01.01.24, 20:20 - ';
	return totalRegex.test(formattedChat);
}

export function parseAndroid(chat: string) {
	const formattedChat = chat + '\n01.01.24, 20:20 - ';

	const matches = formattedChat.matchAll(regex);

	if (!matches) {
		throw new Error('Could not be parsed');
	}

	const messages = [...matches].map((msg) => {
		const [_, timeString, author, rawContent] = msg;
		const content = rawContent.slice(0, -1);
		const [__, dayStr, monthStr, yearStr, hourStr, minStr] = timeString.match(
			/(\d{2})\.(\d{2})\.(\d{2}), (\d{2}):(\d{2})/
		)!;

		const date = new Date(
			parseInt(yearStr) + 2_000,
			parseInt(monthStr) - 1,
			parseInt(dayStr),
			parseInt(hourStr),
			parseInt(minStr)
		);

		switch (content) {
			case '<Medien ausgeschlossen>':
				return { date, author, type: 'image' };
		}

		return {
			date,
			author,
			isEdited: false,
			type: 'message',
			message: content
		};
	}) satisfies Message[];

	return messages.filter(({ author }) => author !== undefined) as Message[];
}
