<script lang="ts">
	import Floating from '$lib/components/utils/Floating.svelte';

	export let emoji: string;
	export let amount: number;

	type Metadata = {
		emoji: string;
		name: string;
		description: string;
	};

	export let metadata: Metadata | null = null;
</script>

<Floating>
	<b slot="main" class="px-1">
		{emoji}
	</b>
	<div slot="floating">
		{#if metadata}
			<h4 class="capitalize">{metadata.emoji} {metadata.name}</h4>

			<span class="text-sm capitalize text-gray-700">{metadata.description}</span>
		{/if}
		<span class="text-md">Used {emoji} {amount} times</span>
	</div>
</Floating>
