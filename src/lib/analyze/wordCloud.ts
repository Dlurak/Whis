import type { Message } from '$lib/files/parseWhatsapp';
import { countObj } from '$lib/utils/strings/words';

interface WordCloudProps {
	authors: string[];
	messages: Message[];
}

type AuthorCounts = Record<string, Record<string, number>>;

export function countsPerAuthor(props: WordCloudProps) {
	const entries = props.authors.map((author) => {
		const authorsMessages = props.messages.filter((m) => m.author === author);
		const authorText = authorsMessages.map(({ message }) => message).join(' ');

		return [author, countObj(authorText)] as const;
	});

	return Object.fromEntries(entries) satisfies AuthorCounts;
}

export function wordCloud(counts: AuthorCounts) {
	return Object.entries(counts).map(([author, counts]) => {
		return Object.entries(counts)
			.map(([word, value]) => ({
				word,
				value,
				group: author
			}))
			.sort((a, b) => b.value - a.value);
	});
}
