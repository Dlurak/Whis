import { describe, it, expect } from 'vitest';
import { convertMillisecs } from './convert';

describe('converts from milliseconds to other formats', () => {
	it('converts', () => {
		expect(convertMillisecs(86_400_000, 'Days')).toBe(1);
		expect(convertMillisecs(86_400_001, 'Days')).toBe(2);

		expect(convertMillisecs(86_400_000, 'Hours')).toBe(24);
		expect(convertMillisecs(86_400_001, 'Hours')).toBe(25);

		expect(convertMillisecs(86_400_000, 'Mins')).toBe(24 * 60);
		expect(convertMillisecs(86_400_001, 'Mins')).toBe(24 * 60 + 1);
	});
});
