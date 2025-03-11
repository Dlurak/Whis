export const removeDuplicates = <T>(arr: T[]) => {
	return [...new Set(arr)];
};

export const removeSortedDuplicates = <T>(arr: T[], isDuplicate?: (a: T, b: T) => boolean): T[] => {
	return arr.reduce<T[]>((uniqueArr, current, index) => {
		if (index === 0) {
			return [...uniqueArr, current];
		}
		const includeThis = isDuplicate?.(arr[index - 1], current) ?? arr[index - 1] === current;
		return includeThis ? uniqueArr : [...uniqueArr, current];
	}, []);
};
