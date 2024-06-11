<script lang="ts">
	import { perTime } from '$lib/analyze/perTime';
	import { TIMES, type Time } from '$lib/constants/dates/time';
	import type { Message } from '$lib/parser/types';
	import { multiplyUntilLength } from '$lib/utils/arrays/length';
	import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
	import { colors } from '$lib/utils/colors/colors';
	import { hour } from '$lib/utils/dates/serialize';
	import { arraysToObj } from '$lib/utils/objects/arrayToObj';
	import { BarChartGrouped, ScaleTypes } from '@carbon/charts-svelte';

	export let messages: Message[];

	const authors = removeDuplicates(messages.map(({ author }) => author));
	const authorColors = arraysToObj(authors, multiplyUntilLength(colors, authors.length));

	const data = perTime<Time>({
		authors,
		times: TIMES,
		messages,
		timeCallback: hour
	});
</script>

<h3>Time</h3>

<BarChartGrouped
	{data}
	options={{
		title: 'Messages per time',
		height: '400px',
		color: { scale: authorColors },

		axes: {
			left: {
				title: 'Messages',
				mapsTo: 'value'
			},
			bottom: {
				title: 'Time',
				mapsTo: 'key',
				scaleType: ScaleTypes.LABELS
			}
		}
	}}
/>
