<script lang="ts">
	import type { Message } from '$lib/files/parseWhatsapp';
	import '@carbon/charts-svelte/styles.css';
	import { BarChartGrouped, ScaleTypes } from '@carbon/charts-svelte';
	import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
	import { arraysToObj } from '$lib/utils/objects/arrayToObj';
	import { multiplyUntilLength } from '$lib/utils/arrays/length';
	import { colors } from '$lib/utils/colors/colors';
	import { weekday } from '$lib/utils/dates/serialize';
	import { WEEKDAYS } from '$lib/constants/dates/weekdays';

	export let messages: Message[];

	const authors = removeDuplicates(messages.map(({ author }) => author));
	const formatted = messages.map((m) => ({
		...m,
		date: weekday(m.date)
	}));

	const data = authors.map((a) => {
		return WEEKDAYS.map((w) => {
			const matching = formatted.filter(({ date, author }) => {
				const dateMatches = date === w;
				const authorMatches = author === a;

				return dateMatches && authorMatches;
			});
			return {
				key: w,
				value: matching.length,
				group: a
			};
		});
	}).flat();

	const authorColors = arraysToObj(authors, multiplyUntilLength(colors, authors.length));
</script>

<h3>Weekday</h3>

<BarChartGrouped
	{data}
	options={{
		title: "Messages per weekday per person",
		height: '400px',
		color: { scale: authorColors },

		axes: {
			left: {
				title: 'Messages (amount)',
				mapsTo: 'value'
			},
			bottom: {
				title: 'Weekday',
				mapsTo: 'key',
				scaleType: ScaleTypes.LABELS
			}
		},
	}}
/>
