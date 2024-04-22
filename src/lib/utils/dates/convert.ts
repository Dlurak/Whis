type Unit = 'Milliseconds' | 'Seconds' | 'Mins' | 'Hours' | 'Days' | 'Week';

/**
 * The factors to multiply a number with to get one unit bigger
 */
const convs = {
	Milliseconds: 1,
	Seconds: 1_000,
	Mins: 60,
	Hours: 60,
	Days: 24,
	Week: 7
} satisfies Record<Unit, number>;

export const convertMillisecs = (ms: number, unit: Unit) => {
	let result = ms;
	for (const [currentUnit, factor] of Object.entries(convs)) {
		result /= factor;

		if (currentUnit === unit) return Math.ceil(result);
	}

	throw new Error('Unsupported unit');
};

export const DAY_IN_MS = 1_000 * 60 * 60 * 24;
