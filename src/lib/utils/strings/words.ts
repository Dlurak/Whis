export const countWords = (str: string) => str.split(/\s+/).length;

export const countObj = (str: string) => {
	const words = str.split(/\s+/);

	let result: Record<string, number> = {};

	for (const word of words) {
		const oldCount = result[word] ?? 0;

		result[word] = oldCount + 1;
	}

	return result;
};
