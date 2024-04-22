export function regexFromStr(str: string) {
	const escapedStr = str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

	return new RegExp(`((^| )${escapedStr})|(${escapedStr}($| ))`, 'g');
}
