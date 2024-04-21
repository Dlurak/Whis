import type { Month } from '$lib/constants/dates/months';
import type { Time } from '$lib/constants/dates/time';
import type { Weekday } from '$lib/constants/dates/weekdays';

export const removeTime = (d: Date) => {
	const day = d.getDate();
	const month = d.getMonth();
	const year = d.getFullYear();

	return new Date(year, month, day);
};

export const stringify = (d: Date) => `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`;

export const weekday = (d: Date) =>
	d.toLocaleDateString('en', {
		weekday: 'long'
	}) as Weekday;

export const month = (d: Date) =>
	d.toLocaleDateString('en', {
		month: 'long'
	}) as Month;

export const hour = (d: Date) =>
	d.toLocaleTimeString('en', {
		hour12: true,
		hour: 'numeric'
	}) as Time;
