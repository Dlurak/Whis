<script lang="ts">
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';

	export let emoji: string;
	export let amount: number;

	type Metadata = {
		emoji: string;
		name: string;
		description: string;
	};

	export let metadata: Metadata | null = null;

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'top',
		middleware: [offset(6), flip(), shift()]
	});

	let showTooltip = false;
</script>

<b
	class="px-1"
	use:floatingRef
	on:mouseenter={() => (showTooltip = true)}
	on:mouseleave={() => (showTooltip = false)}
	role="listitem"
>
	{emoji}
</b>

{#if showTooltip}
	<div
		use:floatingContent
		class="absolute flex flex-col gap-1 rounded bg-white bg-opacity-50 px-4 py-2 shadow-md backdrop-blur-lg"
	>
		{#if metadata}
			<h4 class="capitalize">{metadata.emoji} {metadata.name}</h4>

			<span class="text-sm capitalize text-gray-700">{metadata.description}</span>
		{/if}
		<span class="text-md">Used {emoji} {amount} times</span>
	</div>
{/if}
