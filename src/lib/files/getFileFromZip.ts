import JSZip from "jszip";

export async function getFileFromZip(file: File, fileName: string) {
	const zip = await JSZip.loadAsync(file)
	const zipChatFile = zip.file('_chat.txt');
	if (!zipChatFile) {
		throw new Error(`File ${fileName} not found in zip`)
	}

	return zipChatFile.async('blob')
}
