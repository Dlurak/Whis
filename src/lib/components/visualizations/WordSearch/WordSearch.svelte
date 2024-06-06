<script lang="ts">
	import type { Message } from '$lib/parser';
	import Diagram from './Diagram.svelte';

	export let messages: Message[];
	export let wordcounts: Record<string, Record<string, number>>;

	let searchValue = '';

	let isApplied = false;
	let searchingFor = '';
</script>

<section class="flex w-full flex-col gap-2 py-2">
	<h2>Search for a specific word</h2>

	<div class="flex justify-stretch gap-2">
		<input
			bind:value={searchValue}
			class="rounded px-2 py-1 outline outline-emerald-500"
			type="text"
		/>
		<button
			class="rounded bg-emerald-500 px-2 py-1 text-white disabled:cursor-not-allowed disabled:opacity-50"
			disabled={!searchValue.trim()}
			on:click={() => {
				isApplied = true;
				searchingFor = searchValue;
			}}
		>
			Apply
		</button>
	</div>

	{#if isApplied}
		<Diagram
			search={searchingFor}
			{messages}
		/>
	{/if}
</section>
