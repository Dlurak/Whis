import type { Message } from '$lib/files/parseWhatsapp';
import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
import { removeTime, stringify } from '$lib/utils/dates/serialize';
import { sortDates } from '$lib/utils/dates/sort';
import { promisify } from '$lib/utils/promise/promisify';

type Data = {
	value: number;
	key: string;
	group: string;
};

function generateTimelineSync(messages: Message[]) {
	const formattedMessages = messages.map((m) => ({
		...m,
		date: stringify(m.date)
	}));

	const authors = removeDuplicates(messages.map(({ author }) => author));
	const dates = sortDates(messages.map(({ date }) => removeTime(date)));

	let data: Data[] = [];

	for (let date = dates[0]; date <= (dates.at(-1) || dates[0]); date.setDate(date.getDate() + 1)) {
		for (const author of authors) {
			const matchingMsges = formattedMessages.filter(({ date: dateStr, author: localAuthor }) => {
				const dateMatches = dateStr === stringify(date);
				const authorMatches = author === localAuthor;

				return dateMatches && authorMatches;
			});

			data = [
				...data,
				{
					value: matchingMsges.length,
					key: stringify(date),
					group: author
				}
			];
		}
	}

	return data;
}

export const generateTimeline = (messages: Message[]) =>
	promisify(() => generateTimelineSync(messages));
