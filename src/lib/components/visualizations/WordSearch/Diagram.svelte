<script lang="ts">
	import type { Message } from '$lib/parser';
	import MsgPerDay from '../charts/MsgPerDay.svelte';

	export let search: string;
	export let messages: Message[];

	const serialize = (s: string) =>
		s
			.trim()
			.toLowerCase()
			.replace(/[.,:;!@#$%^&*({\[\]\})\-_'"]/g, ' ');

	$: matchingMessages = messages.filter((msg) => {
		if (msg.type !== 'message') return false;

		const msgContent = serialize(msg.message);
		const s = serialize(search);

		return ` ${msgContent} `.includes(` ${s} `);
	});
</script>

{#if matchingMessages.length === 0}
	<div class="flex w-full items-center justify-center py-5">
		<span>This word isn't used</span>
	</div>
{:else}
	<MsgPerDay messages={matchingMessages} />
{/if}
