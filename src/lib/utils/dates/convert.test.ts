import { describe, it, expect } from 'vitest';
import { millisecondsToDays } from './convert';

describe('converts from milliseconds to other formats', () => {
	it('converts to days', () => {
		expect(millisecondsToDays(1)).toBe(1)
		expect(millisecondsToDays(86_400_000)).toBe(1)
		expect(millisecondsToDays(86_400_001)).toBe(2)
	});
});
