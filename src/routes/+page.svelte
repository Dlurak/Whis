<script lang="ts">
	import { messages, state } from '$lib';

	import Visualizations from '$lib/components/Visualizations.svelte';
	import Export from '$lib/components/home/Export.svelte';
	import Faq from '$lib/components/home/Faq.svelte';
	import Header from '$lib/components/home/Header.svelte';
	import { ExclamationTriangle, Icon } from 'svelte-hero-icons';
</script>

<svelte:head>
	<title>Whis</title>
</svelte:head>

<Header />

{#if $state === 'finished' && $messages}
	{#key $messages}
		<Visualizations messages={$messages} />
	{/key}
{:else if $state === 'none'}
	<div class="flex justify-center py-12">
		<div class="w-full max-w-[92rem] px-4">
			<Export />

			<Faq />
		</div>
	</div>
{:else if $state === 'loading'}
	<div class="flex flex-col items-center justify-center gap-12 p-12">
		<div
			class="h-24 w-24 animate-spin rounded-full border-8 border-transparent border-t-green-400"
		/>
		<span class="text-2xl text-gray-500">Processing</span>
	</div>
{:else}
	<div class="flex flex-col items-center justify-center gap-12 p-12 text-red-500">
		<div class="h-36 w-36 flex items-center justify-center relative">
			<Icon src={ExclamationTriangle} class="h-full w-full" />
			<Icon src={ExclamationTriangle} class="h-full w-full absolute blur-xl" />
		</div>

		<span class="text-2xl">Something went wrong</span>
	</div>
{/if}
