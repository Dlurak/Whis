export async function promisify<T>(callback: () => T) {
	const promise = new Promise<T>((resolve, reject) => {
		setTimeout(() => {
			try {
				resolve(callback());
			} catch (e) {
				reject(e);
			}
		}, 0);
	});

	return await promise;
}
