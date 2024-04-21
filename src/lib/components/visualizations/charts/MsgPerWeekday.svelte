<script lang="ts">
	import type { Message } from '$lib/files/parseWhatsapp';
	import '@carbon/charts-svelte/styles.css';
	import { RadarChart } from '@carbon/charts-svelte';
	import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
	import { arraysToObj } from '$lib/utils/objects/arrayToObj';
	import { multiplyUntilLength } from '$lib/utils/arrays/length';
	import { colors } from '$lib/utils/colors/colors';
	import { weekday } from '$lib/utils/dates/serialize';
	import { type Weekday, WEEKDAYS } from '$lib/constants/dates/weekdays';
	import { perTime } from '$lib/analyze/perTime';

	export let messages: Message[];

	const authors = removeDuplicates(messages.map(({ author }) => author));

	const data = perTime<Weekday>({
		authors,
		times: WEEKDAYS,
		messages,
		timeCallback: weekday
	});

	const authorColors = arraysToObj(authors, multiplyUntilLength(colors, authors.length));
</script>

<h3>Weekday</h3>

<RadarChart
	{data}
	options={{
		title: 'Messages per weekday per person',
		height: '400px',
		color: { scale: authorColors }
	}}
/>
