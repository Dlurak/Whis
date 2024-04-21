<script lang="ts">
	import type { Message } from '$lib/files/parseWhatsapp';
	import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
	import { colors } from '$lib/utils/colors/colors';
	import { svocal } from '$lib/utils/svocal';

	export let messages: Message[];

	const reversedColors = colors.toReversed();
	const upToTodaySetting = svocal('upToToday');

	const days = messages.map(({ date }) =>
		date.toLocaleString('en-US', {
			day: '2-digit',
			month: '2-digit',
			year: '2-digit'
		})
	);

	const uniqueDays = removeDuplicates(days).length;

	const rawDates = messages.map(({ date }) => date).sort((a, b) => a.getTime() - b.getTime());
	const firstDate = rawDates[0];
	$: lastDate = $upToTodaySetting ? new Date() : rawDates[rawDates.length - 1];

	$: msSpan = lastDate.getTime() - firstDate.getTime();
	$: daySpan = Math.floor(msSpan / (1_000 * 60 * 60 * 24)) + 1;

	const fmt = (n: number) => new Intl.NumberFormat().format(n);
</script>

<div class="w-full py-12 text-3xl font-bold">
	<div class="grid w-full grid-cols-1 overflow-hidden rounded-lg md:grid-cols-2">
		<div class="flex flex-col items-center bg-[--bg] py-5" style:--bg={reversedColors[0]}>
			You've chatted
			<span class="text-6xl">{fmt(uniqueDays)} of {fmt(daySpan)}</span>
			days
		</div>

		<div class="flex flex-col items-center bg-[--bg] py-5" style:--bg={reversedColors[1]}>
			You have sent
			<span class="text-6xl">{fmt(messages.length)}</span>
			messages
		</div>
	</div>
</div>
