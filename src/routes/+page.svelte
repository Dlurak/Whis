<script lang="ts">
	import { readFile } from '$lib/files/readFile';
	import { parse } from '$lib/files/parseWhatsapp';
	import { messages } from '$lib';

	import { Icon, ArrowUpTray } from 'svelte-hero-icons';
	import Visualizations from '$lib/components/Visualizations.svelte';
	import Export from '$lib/components/home/Export.svelte';
	import Faq from '$lib/components/home/Faq.svelte';
</script>

<div class="flex flex-col items-center justify-center bg-emerald-400">
	<div class="flex w-full max-w-[92rem] flex-col items-center justify-evenly py-16 md:flex-row">
		<h1 class="text-center font-extrabold italic text-white">Whis</h1>

		<div class="flex items-center justify-center text-3xl text-gray-600">
			<span class="max-w-96 hyphens-auto break-words">
				The best way to analyze your WhatsApp chats!
			</span>
		</div>
	</div>

	<div class="py-16">
		<button
			class="flex items-center justify-center gap-2 rounded bg-emerald-500 px-12 py-4 text-xl shadow-sm transition-all hover:shadow-xl focus:bg-emerald-300 focus:shadow-xl focus:outline-none"
			on:click={async () => {
				readFile().then((content) => messages.set(parse(content)));
			}}
		>
			<Icon src={ArrowUpTray} mini class="h-6 w-6" />
			<div class="whitespace-nowrap">Load file</div>
		</button>
	</div>
</div>

{#if $messages}
	{#key $messages}
		<Visualizations messages={$messages} />
	{/key}
{:else}
	<div class="flex justify-center py-12">
		<div class="max-w-[92rem] px-4 w-full">
			<Export />

			<Faq />
		</div>
	</div>
{/if}
