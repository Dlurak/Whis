<script>
	import { messages, state } from '$lib';
	import { parse } from '$lib/parser';
	import { readBlob } from '$lib/files/readFile';
	import { ArrowUpTray, Icon } from 'svelte-hero-icons';
	import { FileDropzone } from '@skeletonlabs/skeleton';
	import JSZip from 'jszip';
	import { getFileFromZip } from '$lib/files/getFileFromZip';
</script>

<div class="flex flex-col items-center justify-center bg-emerald-400 pb-10">
	<div class="flex w-full max-w-[92rem] flex-col items-center justify-evenly py-16 md:flex-row">
		<h1 class="text-center font-extrabold italic text-white">Whis</h1>

		<div class="flex items-center justify-center text-3xl text-gray-600">
			<span class="max-w-96 hyphens-auto break-words px-3">
				The best way to analyze your WhatsApp chats!
			</span>
		</div>
	</div>

	<div>
		<FileDropzone
			name="file"
			multiple={false}
			accept=".txt, .json, .zip"
			regionInterfaceText="flex flex-col items-center justify-center gap-2"
			on:change={async (e) => {
				/** @type {HTMLInputElement | null} */
				// @ts-ignore
				const target = e.target;

				if (!target) return;
				const files = target.files;
				if (!files) return;
				if (files.length < 1) return;

				state.set('loading');

				const file = files[0];
				const isZip = file.name.endsWith('.zip');

				const chatFile = isZip ? getFileFromZip(file, '_chat.txt') : Promise.resolve(file);

				chatFile
					.then(readBlob)
					.then((content) => {
						const parsed = parse(content);
						messages.set(parsed);
						state.set('finished');
					})
					.catch(() => {
						state.set('error');
					});
			}}
		>
			<Icon src={ArrowUpTray} mini class="h-6 w-6" slot="lead" />
			<p slot="meta">WhatsApp formatted .txt files allowed</p>
		</FileDropzone>
	</div>
</div>
