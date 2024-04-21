export function parse(chat: string) {
	const msgStrings = chat.split('\r\n').filter((i) => i);

	const messages = msgStrings
		.map((msg) => {
			const [metadata, ...messageParts] = msg.split(': ');
			const message = messageParts.join(': ');

			if (message === '') return undefined;

			const [rawDate, ...authorParts] = metadata.split('] ');

			const author = authorParts.join('] ');

			const parts = rawDate.replace(/[^\d,.: ]/g, '').split(/[.,: ]+/)

			const date = new Date(
				parseInt(parts[2]) + 2000,
				parseInt(parts[1]) - 1,
				parseInt(parts[0]),
				parseInt(parts[3]),
				parseInt(parts[4]),
				parseInt(parts[5])
			);

			return { date, author, message };
		})
		.filter((i) => i) as Message[];

	return messages;
}

export type Message = {
	date: Date;
	author: string;
	message: string;
};
