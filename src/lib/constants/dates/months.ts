export type Month =
	| 'January'
	| 'February'
	| 'March'
	| 'April'
	| 'May'
	| 'June'
	| 'July'
	| 'August'
	| 'September'
	| 'October'
	| 'November'
	| 'December';

export const MONTHS: Date[] = Array.from({ length: 12 }, (_, i) => new Date(2020, i, 2));
