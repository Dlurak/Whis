export function arraysToObj<K extends string, V>(keys: K[], vals: V[]) {
	const valLengths = vals.length;

	const pairs = keys.map((key, index) => {
		if (index >= valLengths) return undefined;

		return [key, vals[index]] as const;
	});

	const filtered = pairs.filter((p) => Array.isArray(p)) as [K, V][];
	return Object.fromEntries(filtered);
}
