export const findMaxBy = <T>(
	array: T[],
	predicate: (item: T, index: number) => number
): T | null => {
	return array.reduce<{ max: T | null; maxVal: number }>(
		(acc, item, index) => {
			const value = predicate(item, index);
			return value > acc.maxVal ? { max: item, maxVal: value } : acc;
		},
		{ max: null, maxVal: -Infinity }
	).max;
};
