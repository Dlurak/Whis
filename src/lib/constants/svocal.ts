export const SVOCAL = {
	upToToday: {
		key: 'settings.upToToday',
		default: true
	}
};

export type SvocalKey = keyof typeof SVOCAL;
export type Svocal<T extends SvocalKey> = (typeof SVOCAL)[T];
export type DefaultSvocal<T extends SvocalKey> = Svocal<T>['default'];
