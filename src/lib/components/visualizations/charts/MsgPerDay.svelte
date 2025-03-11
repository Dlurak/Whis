<script lang="ts">
	import type { Message } from '$lib/parser/types';
	import '@carbon/charts-svelte/styles.css';
	import { LineChart, ScaleTypes } from '@carbon/charts-svelte';
	import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
	import { arraysToObj } from '$lib/utils/objects/arrayToObj';
	import { multiplyUntilLength } from '$lib/utils/arrays/length';
	import { colors } from '$lib/utils/colors/colors';
	import { pick } from '$lib/utils/arrays/pick';
	import { createDateList } from '$lib/utils/dates/list';
	import { perTime } from '$lib/analyze/perTime';
	import { promisify } from '$lib/utils/promise/promisify';
	import { stringify } from '$lib/utils/dates/serialize';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';

	export let messages: Message[];

	const stripTime = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
	const daysBetween = (date1: Date, date2: Date) => {
		const d1 = stripTime(date1);
		const d2 = stripTime(date2);

		const diffTime = Math.abs(d2.getTime() - d1.getTime());
		return Math.floor(diffTime / (1000 * 60 * 60 * 24));
	};
	const isEqual = (smoothing: number) => (a: Date, b: Date) => {
		const diff = daysBetween(a, b);
		return diff <= smoothing;
	};

	$: authors = removeDuplicates(messages.map(({ author }) => author));
	$: authorColors = arraysToObj(authors, multiplyUntilLength(colors, authors.length));

	$: messageDates = messages.map(({ date }) => date).sort((a, b) => a.getTime() - b.getTime());

	$: filledData = promisify(() => {
		const times = createDateList(messageDates[0], messageDates[messageDates.length - 1]);
		// TODO: Make it dynamic
		const smoothing = 6;
		return {
			data: perTime({
				authors,
				messages,
				times,
				isEqual: isEqual(smoothing),
				smoothingCount: smoothing * 2 + 1,
				timeCallback: stringify
			})
		};
	});

	$: normalData = promisify(() => ({
		data: perTime({
			authors,
			messages,
			times: messageDates,
			timeCallback: stringify
		})
	}));

	const group = writable<'all' | 'active'>('all');
</script>

<TabGroup>
	<Tab bind:group={$group} name="All dates" value="all">
		<span>All dates</span>
	</Tab>
	<Tab bind:group={$group} name="Active dates" value="active">
		<span>Only active dates</span>
	</Tab>

	<svelte:fragment slot="panel">
		{#await $group === 'active' ? normalData : filledData}
			<div class="flex flex-col items-center justify-center gap-6 py-12">
				<div
					class="h-20 w-20 animate-spin rounded-full border-8 border-transparent border-t-green-400"
				/>
				<span class="text-2xl text-gray-500">Processing</span>
			</div>
		{:then data}
			<LineChart
				data={data.data}
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
								values: pick(removeDuplicates(data.data.map(({ key }) => key)), 20)
							}
						}
					},
					height: '400px'
				}}
			/>
		{/await}
	</svelte:fragment>
</TabGroup>
