<script lang="ts">
	import type { Message } from '$lib/parser/types';

	export let messages: Message[];

	const dates = messages.map(({ date }) => date).sort((a, b) => a.getTime() - b.getTime());

	const firstDate = dates[0];
	const lastDate = dates[dates.length - 1];

	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: '2-digit',
		year: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		weekday: 'long'
	};
</script>

<div class="w-full max-w-[54rem] py-12 font-bold">
	<div class="flex flex-col">
		<span class="text-3xl">First message</span>
		<span class="text-left text-5xl">{firstDate.toLocaleString(undefined, options)}</span>
	</div>
	<div class="flex flex-col items-end">
		<span class="text-right text-5xl">{lastDate.toLocaleString(undefined, options)}</span>
		<span class="text-3xl">Last message</span>
	</div>
</div>
