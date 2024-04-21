export function readBlob(blob: Blob) {
	return new Promise<string>((resolve, reject) => {
		const reader = new FileReader();

		reader.onload = (event) => resolve(`${event.target?.result}`);

		reader.onerror = () => reject('File could not be read!');

		reader.readAsText(blob);
	});
}
