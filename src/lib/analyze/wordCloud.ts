import type { Message } from '$lib/files/parseWhatsapp';
import { countObj } from '$lib/utils/strings/words';

interface WordCloudProps {
	authors: string[];
	messages: Message[];
}

export function wordCloud({ authors, messages }: WordCloudProps) {
	const counts = authors.map((author) => {
		const authorsMessages = messages.filter((m) => m.author === author);
		const authorText = authorsMessages.map(({ message }) => message).join(' ');

		return Object.entries(countObj(authorText))
			.map((entry) => ({
				word: entry[0],
				value: entry[1],
				group: author
			}))
			.sort((a, b) => b.value - a.value);
	});

	return counts;
}
