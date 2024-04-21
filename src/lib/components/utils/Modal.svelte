<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Icon, XMark } from 'svelte-hero-icons';

	const dispatch = createEventDispatcher();

	let dialogElement: HTMLDialogElement;
	export let isOpen = false;

	const open = () => {
		if (!dialogElement) return;
		dialogElement.showModal();
		isOpen = true;
		dispatch('open');
	};

	const close = () => {
		if (!dialogElement) return;
		dialogElement.close();
		isOpen = false;
		dispatch('close');
	};

	$: {
		if (isOpen) open();
		else close();
	}
</script>

<dialog
	bind:this={dialogElement}
	class="min-w-[min(24rem,100%)] rounded-md bg-gray-200 shadow-2xl backdrop:bg-black backdrop:opacity-50 backdrop:saturate-50"
>
	<div class="flex items-center gap-6 border-b-gray-500 bg-gray-300 px-3 py-1">
		<div class="w-full">
			<b><slot name="title" /></b>
		</div>

		<button on:click={close}>
			<Icon src={XMark} class="h-8 w-8 text-red-500" />
		</button>
	</div>

	<div class="px-3 py-1">
		<slot name="body" />
	</div>
</dialog>
