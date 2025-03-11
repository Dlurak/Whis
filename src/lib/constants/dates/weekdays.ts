export type Weekday =
	| 'Monday'
	| 'Tuesday'
	| 'Wednesday'
	| 'Thursday'
	| 'Friday'
	| 'Saturday'
	| 'Sunday';

const weekdayIndex = (weekdayIndex: number) => (weekdayIndex === 0 ? 7 : weekdayIndex - 1);

export const WEEKDAYS = Array.from({ length: 7 }, (_, i) => new Date(0, 0, i)).toSorted(
	(a, b) => weekdayIndex(a.getDay()) - weekdayIndex(b.getDay())
);
