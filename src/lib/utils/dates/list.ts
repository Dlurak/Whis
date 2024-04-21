export const createDateList = (start: Date, end: Date) => {
	const dates: Date[] = [];

	for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
		dates.push(new Date(date));
	}

	return dates;
};
