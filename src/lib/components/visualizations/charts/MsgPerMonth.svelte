<script lang="ts">
	import { perTime } from '$lib/analyze/perTime';
	import { MONTHS, type Month } from '$lib/constants/dates/months';
	import type { Message } from '$lib/parser/types';
	import { multiplyUntilLength } from '$lib/utils/arrays/length';
	import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
	import { colors } from '$lib/utils/colors/colors';
	import { month } from '$lib/utils/dates/serialize';
	import { arraysToObj } from '$lib/utils/objects/arrayToObj';
	import { RadarChart } from '@carbon/charts-svelte';

	export let messages: Message[];

	const authors = removeDuplicates(messages.map(({ author }) => author));
	const authorColors = arraysToObj(authors, multiplyUntilLength(colors, authors.length));

	const data = perTime<Month>({
		authors,
		times: MONTHS,
		messages,
		timeCallback: month
	});
</script>

<h3>Month</h3>

<RadarChart
	{data}
	options={{
		title: 'Messages per month',
		height: '400px',
		color: { scale: authorColors }
	}}
/>
