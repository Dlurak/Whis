/**
 * @param bg The background color in hex
 */
export const blackOrWhiteText = (bg: string) => {
	const r = parseInt(bg.slice(1, 3), 16);
	const g = parseInt(bg.slice(3, 5), 16);
	const b = parseInt(bg.slice(5, 7), 16);
	const brightness = (r * 299 + g * 587 + b * 114) / 1000;
	return brightness > 125 ? 'black' : 'white';
};
