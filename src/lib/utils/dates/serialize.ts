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
	});

export const month = (d: Date) =>
	d.toLocaleDateString('en', {
		month: 'long'
	});
