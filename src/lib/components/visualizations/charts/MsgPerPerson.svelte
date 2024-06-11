<script lang="ts">
	import type { Message } from '$lib/parser/types';
	import '@carbon/charts-svelte/styles.css';
	import { PieChart } from '@carbon/charts-svelte';
	import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
	import { arraysToObj } from '$lib/utils/objects/arrayToObj';
	import { multiplyUntilLength } from '$lib/utils/arrays/length';
	import { colors } from '$lib/utils/colors/colors';

	export let messages: Message[];

	const authors = removeDuplicates(messages.map(({ author }) => author));
	const authorColors = arraysToObj(authors, multiplyUntilLength(colors, authors.length));
</script>

<h3>Person</h3>

<PieChart
	data={authors.map((au) => ({
		value: messages.filter(({ author }) => author === au).length,
		group: au
	}))}
	options={{
		title: 'Message count',
		height: '400px',
		legend: {
			enabled: true,
			clickable: true,
			position: 'top'
		},
		color: { scale: authorColors }
	}}
/>
