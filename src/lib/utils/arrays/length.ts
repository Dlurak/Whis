const appendUntilLength = <T>(arr: T[], append: T[], desiredLength: number): T[] => {
	if (arr.length >= desiredLength) return arr

	const appended = [...arr, ...append]

	if (appended.length >= desiredLength) return appended
	return appendUntilLength(appended, append, desiredLength)
}

export const multiplyUntilLength = <T>(arr: T[], desiredLength: number) => {
	if (arr.length >= desiredLength) return arr

	return appendUntilLength(arr, arr, desiredLength)
}
