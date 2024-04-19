<script lang="ts">
	import { readFile } from '$lib/files/readFile';
	import { parse } from '$lib/files/parseWhatsapp';
	import { messages } from '$lib';
</script>

<button
	on:click={async () => {
		readFile().then((content) => messages.set(parse(content)));
	}}
>
	Load file
</button>
