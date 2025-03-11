import type { Message } from '$lib/parser/types';
import { removeSortedDuplicates } from '$lib/utils/arrays/removeDuplicates';

interface PerTimeProps<T extends string> {
	authors: string[];
	times: Date[];
	messages: Message[];
	timeCallback: (date: Date) => T;

	sort?: (a: string, b: string) => number;
	isEqual?: (a: Date, b: Date) => boolean;
	smoothingCount?: number;
}

export function perTime<T extends string>({
	authors,
	times: timesWithDuplicates,
	messages,
	timeCallback,
	sort,
	isEqual,
	smoothingCount = 1
}: PerTimeProps<T>) {
	const times = removeSortedDuplicates(
		timesWithDuplicates,
		(a, b) => timeCallback(a) === timeCallback(b)
	);
	const baseResult = times.flatMap((time) => {
		return authors.map((a) => {
			const authorsMsges = messages.filter(({ author }) => author === a);
			const filteredMsges = authorsMsges.filter(
				({ date }) => isEqual?.(date, time) ?? timeCallback(date) === timeCallback(time)
			);
			return {
				key: timeCallback(time),
				value: Math.round(filteredMsges.length / smoothingCount),
				group: a
			};
		});
	});

	if (sort) return baseResult.toSorted(({ key: keyA }, { key: keyB }) => sort(keyA, keyB));

	return baseResult;
}
