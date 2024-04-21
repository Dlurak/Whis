import { SVOCAL, type DefaultSvocal, type Svocal, type SvocalKey } from '$lib/constants/svocal';
import { localstorage } from 'svocal';

const accessSvocalDict = <T extends SvocalKey>(key: T) => {
	return SVOCAL[key] as Svocal<T>;
};

export const svocal = <T extends SvocalKey>(key: T) => {
	const data = accessSvocalDict(key);

	const defaultVal = data.default as DefaultSvocal<T>;

	return localstorage(data.key, defaultVal);
};
