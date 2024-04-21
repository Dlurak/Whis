export type Time = `${number} ${'AM' | 'PM'}`;

export const TIMES = [
	...new Array(12).fill(null).map((_, i) => `${i + 1} AM` as const),
	...new Array(12).fill(null).map((_, i) => `${i + 1} PM` as const)
] satisfies Time[];
