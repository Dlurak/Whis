import { describe, it, expect } from 'vitest';
import { pick } from './pick';

describe('picks x elements from the array', () => {
	it('works with odd numbers', () => {
		expect(pick([1, 2, 3, 4, 5], 3)).toEqual([1, 3, 5]);
		expect(pick([1, 2, 3, 4, 5, 6, 7], 3)).toEqual([1, 4, 7]);

		expect(pick([1, 2, 3, 4, 5, 6, 7, 8], 3)).toEqual([1, 4, 8]);
	});
});
