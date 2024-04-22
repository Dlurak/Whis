export const millisecondsToDays = (ms: number) => {
	return Math.ceil(ms / (1_000 * 60 * 60 * 24))
}

export const DAY_IN_MS = 1_000 * 60 * 60 * 24
