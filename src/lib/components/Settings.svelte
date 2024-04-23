<script lang="ts">
	import Modal from '$lib/components/utils/Modal.svelte';
	import { svocal } from '$lib/utils/svocal';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import { Cog, Icon } from 'svelte-hero-icons';

	let isOpen = false;

	const upToToday = svocal('upToToday');
	const amountEmoji = svocal('amountEmoji');
</script>

<Modal bind:isOpen>
	<svelte:fragment slot="title">Settings</svelte:fragment>

	<div slot="body">
		<section>
			<h3>Chatted on days</h3>

			<span>
				These settings are about the pink label that shows on how many days you've activley chatted
			</span>

			<div class="flex flex-col gap-2 py-6">
				<span class="flex justify-between">
					<span>Measure up to today</span>
					<SlideToggle
						name="today"
						active="bg-emerald-500"
						background="bg-gray-400"
						bind:checked={$upToToday}
					/>
				</span>

				<span class="flex items-center justify-between gap-2">
					<span>Amount of emoji to show</span>

					<div class="flex w-1/3 min-w-20 max-w-full items-center gap-2">
						<input
							type="range"
							bind:value={$amountEmoji}
							min="0"
							max="25"
							class="h-1 cursor-pointer appearance-none rounded-md bg-emerald-500"
						/>
						<span class="bg-emerald-500 px-2 lg:px-3">
							{$amountEmoji}
						</span>
					</div>
				</span>
			</div>
		</section>
	</div>
</Modal>

<button
	class="fixed bottom-10 right-10 z-10 h-16 w-16 rounded-full bg-emerald-500 text-white transition-all hover:rotate-90"
	on:click={() => (isOpen = !isOpen)}
>
	<Icon src={Cog} />
</button>
