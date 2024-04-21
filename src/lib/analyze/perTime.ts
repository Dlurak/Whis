import type { Message } from '$lib/files/parseWhatsapp';
import { removeSortedDuplicates } from '$lib/utils/arrays/removeDuplicates';

interface PerTimeProps<T extends string> {
	authors: string[];
	times: T[];
	messages: Message[];
	timeCallback: (date: Date) => T;

	sort?: (a: string, b: string) => number;
}

export function perTime<T extends string>({
	authors,
	times,
	messages,
	timeCallback,
	sort
}: PerTimeProps<T>) {
	const formatted = messages.map((m) => ({
		...m,
		date: timeCallback(m.date)
	}));

	const baseResult = removeSortedDuplicates(times).flatMap((time) => {
		return authors.map((a) => ({
			key: time,
			value: formatted.filter(({ date, author }) => date === time && author === a).length,
			group: a
		}));
	});

	if (sort) return baseResult.sort(({ key: keyA }, { key: keyB }) => sort(keyA, keyB));

	return baseResult;
}
