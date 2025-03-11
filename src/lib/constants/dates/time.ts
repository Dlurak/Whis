export type Time = `${number} ${'AM' | 'PM'}`;

export const TIMES = 
Array.from({ length: 24 }, (_, i) => new Date(0, 0, 0, i + 1));
