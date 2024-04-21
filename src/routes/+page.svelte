<script lang="ts">
	import { readFile } from '$lib/files/readFile';
	import { parse } from '$lib/files/parseWhatsapp';
	import { messages } from '$lib';

	import { Icon, ArrowUpTray } from 'svelte-hero-icons';
	import Visualizations from '$lib/components/Visualizations.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let topHeight = 0;
	let bottomHeight = 0;
</script>

<div
	class="flex flex-col items-center justify-center bg-emerald-400 py-12"
	bind:clientHeight={topHeight}
>
	<div class="flex w-full max-w-[92rem] items-center justify-evenly py-16 flex-col md:flex-row">
		<h1 class="text-center font-extrabold italic text-white">Whis</h1>

		<div class="flex items-center justify-center text-3xl text-gray-600">
			<span class="max-w-72 hyphens-auto break-words">
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
			<Icon src={ArrowUpTray} mini class="h-6" />
			<div class="w-full whitespace-nowrap">Load file</div>
		</button>
	</div>
</div>

<main
	class="min-h-[--height] outline"
	style:--height={`calc(100svh - ${bottomHeight + topHeight}px)`}
>
	{#if $messages}
		{#key $messages}
			<Visualizations messages={$messages} />
		{/key}
	{/if}
</main>

<Footer bind:height={bottomHeight} />
