<script lang="ts">
	import type { Message } from '$lib/files/parseWhatsapp';
	import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
	import { colors } from '$lib/utils/colors/colors';

	export let messages: Message[];

	const reversedColors = colors.toReversed();

	const days = messages.map(({ date }) =>
		date.toLocaleString('en-US', {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit'
		})
	);

	const uniqueDays = removeDuplicates(days);
</script>

<div class="grid w-full grid-cols-2 rounded-lg py-12 text-3xl font-bold">
	<div
		class="flex flex-col items-center rounded-bl-lg rounded-tl-lg bg-[--bg] py-5"
		style:--bg={reversedColors[0]}
	>
		You have chatted for
		<span class="text-6xl">{new Intl.NumberFormat().format(uniqueDays.length)}</span>
		days
	</div>

	<div
		class="flex flex-col items-center rounded-br-lg rounded-tr-lg bg-[--bg] py-5"
		style:--bg={reversedColors[1]}
	>
		You have sent
		<span class="text-6xl">{new Intl.NumberFormat().format(messages.length)}</span>
		messages
	</div>
</div>
