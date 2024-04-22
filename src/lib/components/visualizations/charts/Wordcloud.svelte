<script lang="ts">
	import '@carbon/charts-svelte/styles.css';
	import { WordCloudChart } from '@carbon/charts-svelte';
	import { arraysToObj } from '$lib/utils/objects/arrayToObj';
	import { multiplyUntilLength } from '$lib/utils/arrays/length';
	import { colors } from '$lib/utils/colors/colors';
	import { wordCloud } from '$lib/analyze/wordCloud';

	export let counts: Record<string, Record<string, number>>;
	export let authors: string[];

	const authorAmount = authors.length;
	const authorColors = arraysToObj(authors, multiplyUntilLength(colors, authorAmount));

	const data = wordCloud(counts);

	let perAuthor = 100 / authorAmount;

	$: sliced = data.flatMap((block) => block.slice(0, perAuthor));
</script>

<h3>Weekday</h3>

<WordCloudChart
	data={sliced}
	options={{
		height: '400px',
		color: { scale: authorColors }
	}}
/>

<div class="flex justify-center gap-4">
	<div class="w-full py-2">
		<input
			type="range"
			min="1"
			max={75 * authorAmount}
			bind:value={perAuthor}
			class="h-1 w-full cursor-pointer appearance-none rounded-md bg-emerald-500"
		/>
	</div>
	<span class="flex items-center justify-center rounded-sm bg-emerald-500 px-3 py-1">
		{perAuthor}
	</span>
</div>
