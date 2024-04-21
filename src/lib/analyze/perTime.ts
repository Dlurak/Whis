import type { Message } from '$lib/files/parseWhatsapp';

interface PerTimeProps<T extends string> {
	authors: string[];
	times: T[];
	messages: Message[];
	timeCallback: (date: Date) => T;
}

export function perTime<T extends string>({
	authors,
	times,
	messages,
	timeCallback
}: PerTimeProps<T>) {
	const formatted = messages.map((m) => ({
		...m,
		date: timeCallback(m.date)
	}));

	return authors.flatMap((a) => {
		return times.map((time) => ({
			key: time,
			value: formatted.filter(({ date, author }) => date === time && author === a).length,
			group: a
		}));
	});
}
