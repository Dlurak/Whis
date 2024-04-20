<script lang="ts">
	import type { Message } from '$lib/files/parseWhatsapp';
	import { countWords } from '$lib/utils/strings/words';
	import { average, sum } from '$lib/utils/numbers/arthimethic';
	import { count } from '$lib/utils/arrays/count';

	import { parse } from '@devsnowflake/text-emoji-parser';
	import { blackOrWhiteText } from '$lib/utils/colors/contrast';

	export let name: string;
	export let color: string;
	export let messages: Message[];

	const msges = messages.filter((m) => m.author === name);

	const msgLengths = msges.map(({ message }) => countWords(message));

	const longestLength = msgLengths.sort((a, b) => b - a)[0];

	const totalWordCount = sum(msgLengths);
	const totalWordCountFormatted = new Intl.NumberFormat('en').format(totalWordCount);

	const entireText = msges.map(({ message }) => message).join('');

	const emojiCounts = count(parse(entireText).map(({ text }) => text));
	const emojis: string[] = Object.entries(emojiCounts)
		.sort((a, b) => b[1] - a[1])
		.map(([i]) => i);
</script>

<div class="w-full rounded-sm p-4 outline outline-2 outline-gray-300">
	<h3
		class="mb-4 truncate rounded-sm bg-[--bg] px-2 py-4 text-center text-4xl text-[--text-col]"
		style:--bg={color}
		style:--text-col={blackOrWhiteText(color)}
	>
		{name}
	</h3>

	<ul>
		<li>Total words: <b>{totalWordCountFormatted}</b></li>
		{#if emojis.length > 0}
			<li>Most used emojis: <b>{emojis.slice(0, 3).join(', ')}</b></li>
		{/if}
		<li>Longest message: <b>{longestLength}</b></li>
		<li>Average words per message: <b>{Math.round(average(msgLengths) * 10) / 10}</b></li>
	</ul>
</div>
