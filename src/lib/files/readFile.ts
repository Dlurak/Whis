export function readFile() {
	return new Promise<string>((resolve, reject) => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.txt';

		input.addEventListener('change', (event) => {
			// @ts-ignore
			const files = event.target?.files as Blob[]

			if (files.length < 1) reject("No file selected")
			const reader = new FileReader();

			reader.onload = (event) => resolve(`${event.target?.result}`);

			reader.onerror = () => reject('File could not be read!');

			reader.readAsText(files[0]);
		});

		input.click();
	});
}
