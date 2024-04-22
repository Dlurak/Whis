<script lang="ts">
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { emoticon as allEmoticon } from 'emoticon';

	export let emoticon: string;
	export let amount: number;

	const fullEmoticon = allEmoticon.find(({ emoticons }) => emoticons.includes(emoticon));

	const allRawEmo = allEmoticon.flatMap(({ emoticons }) => emoticons);

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
	{emoticon}
</b>

{#if showTooltip && fullEmoticon}
	<div
		use:floatingContent
		class="absolute flex flex-col gap-1 rounded bg-white bg-opacity-50 px-4 py-2 shadow-md backdrop-blur-lg"
	>
		<h4 class="capitalize">{fullEmoticon.emoji} {fullEmoticon.name}</h4>

		<span class="text-sm capitalize text-gray-700">{fullEmoticon.description}</span>

		<span class="text-md">Used {emoticon} {amount} times</span>
	</div>
{/if}
