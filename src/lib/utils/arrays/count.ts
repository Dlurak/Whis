export const count = (arr: string[]) => {
	let counts: Record<string, number> = {};

	for (const item of arr) {
		counts[item] = (counts[item] ?? 0) + 1;
	}

	return counts;
};
