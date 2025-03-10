<script lang="ts">
	import { offset, flip, shift } from 'svelte-floating-ui/dom';
	import { createFloatingActions } from 'svelte-floating-ui';
	import { useHover } from 'nutzlich';

	export let opaque = true;

	const [floatingRef, floatingContent] = createFloatingActions({
		strategy: 'absolute',
		placement: 'top',
		middleware: [offset(10), flip(), shift()]
	});

	const [showTooltip, hoverRef] = useHover();
</script>

<span use:floatingRef use:hoverRef>
	<slot name="main" />
</span>

{#if $showTooltip}
	<div
		use:floatingContent
		class="absolute m-2 flex max-w-96 flex-col gap-1 rounded bg-zinc-50 px-4 py-2 shadow-md backdrop-blur-lg"
		class:bg-opacity-50={opaque}
	>
		<slot name="floating" />
	</div>
{/if}
