export function pick<T>(arr: T[], amount: number) {
	const arrLength = arr.length;
	const thrownAwayElementsLength = arrLength - amount;

	const spaceBetween = thrownAwayElementsLength / (amount - 1);

	const result: T[] = [];

	let i = 0;
	while (i < arrLength) {
		result.push(arr[Math.floor(i)]);
		i += spaceBetween + 1;
	}

	return result;
}
