export const removeDuplicates = <T>(arr: T[]) => {
	return [...new Set(arr)];
};

export const removeSortedDuplicates = <T>(arr: T[]) => {
	return arr.reduce((uniqueArr: T[], current: T, index: number) => {
		if (index === 0 || current !== arr[index - 1]) {
			return [...uniqueArr, current];
		}
		return uniqueArr;
	}, []);
};
