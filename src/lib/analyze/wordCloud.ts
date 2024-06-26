import { URL_REGEX } from '$lib/constants/regex';
import type { Message } from '$lib/parser/types';
import { countObj } from '$lib/utils/strings/words';

interface WordCloudProps {
	authors: string[];
	messages: Message[];
}

type AuthorCounts = Record<string, Record<string, number>>;

export function countsPerAuthor(props: WordCloudProps) {
	const entries = props.authors.map((author) => {
		const authorsMessages = props.messages.filter((m) => m.author === author);
		const authorText = authorsMessages
			.map((msg) => (msg.type === 'message' ? msg.message : ''))
			.join(' ')
			.toLowerCase()
			.replace(URL_REGEX, '')
			.replace(/[.,-_#'"!?%/(){}\[\]]/g, '');

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
