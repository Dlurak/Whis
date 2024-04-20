<script lang="ts">
	import type { Message } from '$lib/files/parseWhatsapp';
	import { multiplyUntilLength } from '$lib/utils/arrays/length';
	import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
	import { colors } from '$lib/utils/colors/colors';
	import { month } from '$lib/utils/dates/serialize';
	import { arraysToObj } from '$lib/utils/objects/arrayToObj';
	import { RadarChart } from '@carbon/charts-svelte';

	export let messages: Message[];

	const authors = removeDuplicates(messages.map(({ author }) => author));
	const formatted = messages.map((m) => ({
		...m,
		date: month(m.date)
	}));

	const months = removeDuplicates(formatted.map(({ date }) => date));

	const data = authors
		.map((a) => {
			return months.map((m) => {
				const matching = formatted.filter(({ date, author }) => {
					const dateMatches = date === m;
					const authorMatches = author === a;

					return dateMatches && authorMatches;
				});

				return {
					feature: m,
					score: matching.length,
					product: a
				};
			});
		})
		.flat();

	const authorColors = arraysToObj(authors, multiplyUntilLength(colors, authors.length));
</script>

<h3>Month</h3>

<RadarChart
	{data}
	options={{
		title: 'Messages per month',
		height: '400px',
		color: { scale: authorColors },
		radar: {
			axes: {
				angle: 'feature',
				value: 'score'
			}
		},
		data: { groupMapsTo: 'product' }
	}}
/>
