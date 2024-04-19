const regex =
	/.?\[(\d{2}.\d{2}.\d{2}, \d{2}:\d{2}:\d{2})\] (([^:]+)|(@[a-z]+:[a-z]+\.[a-z]+)):(.*)/;

export function parse(chat: string) {
	const msgStrings = chat.split('\r\n').filter(i => i)

	const messages = msgStrings.map((msg) => {
		const match = msg.match(regex);
		if (!match) {
			console.log(msg)
			throw new Error('uprocessable');
		}

		const [_, dateStr, author, __, ___, message] = match;

		return { date: new Date(dateStr), author, message };
	});

	return messages
}

export type Message = {
    date: Date;
    author: string;
    message: string;
}
