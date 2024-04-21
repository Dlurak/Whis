<script lang="ts">
	import type { Message } from '$lib/files/parseWhatsapp';
	import '@carbon/charts-svelte/styles.css';
	import { LineChart, ScaleTypes } from '@carbon/charts-svelte';
	import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
	import { arraysToObj } from '$lib/utils/objects/arrayToObj';
	import { multiplyUntilLength } from '$lib/utils/arrays/length';
	import { colors } from '$lib/utils/colors/colors';
	import { generateTimeline } from '$lib/analyze/timeline';
	import { pick } from '$lib/utils/arrays/pick';

	export let messages: Message[];

	const authors = removeDuplicates(messages.map(({ author }) => author));
	const authorColors = arraysToObj(authors, multiplyUntilLength(colors, authors.length));
</script>

{#await generateTimeline(messages)}
	<div class="flex flex-col items-center justify-center gap-6 py-12">
		<div
			class="h-20 w-20 animate-spin rounded-full border-8 border-transparent border-t-green-400"
		/>
		<span class="text-2xl text-gray-500">Processing</span>
	</div>
{:then data}
	<LineChart
		{data}
		options={{
			title: 'Messages sent per day per author',
			color: { scale: authorColors },
			axes: {
				left: {
					title: 'Messages (count)',
					mapsTo: 'value'
				},
				bottom: {
					title: 'Dates',
					scaleType: ScaleTypes.LABELS,
					mapsTo: 'key',

					ticks: {
						values: pick(
							data.map(({ key }) => key),
							20
						)
					}
				}
			},
			height: '400px'
		}}
	/>
{/await}
