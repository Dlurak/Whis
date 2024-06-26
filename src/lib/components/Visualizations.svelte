<script lang="ts">
	import type { Message } from '$lib/parser/types';
	import { multiplyUntilLength } from '$lib/utils/arrays/length';
	import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
	import { colors } from '$lib/utils/colors/colors';
	import { arraysToObj } from '$lib/utils/objects/arrayToObj';
	import BigStats from './visualizations/BigStats.svelte';
	import Person from './visualizations/Person/Person.svelte';
	import TimeRange from './visualizations/TimeRange.svelte';

	import '@carbon/charts-svelte/styles.css';
	import MsgPerPerson from './visualizations/charts/MsgPerPerson.svelte';
	import MsgPerDay from './visualizations/charts/MsgPerDay.svelte';
	import MsgPerWeekday from './visualizations/charts/MsgPerWeekday.svelte';
	import MsgPerMonth from './visualizations/charts/MsgPerMonth.svelte';
	import MsgPerTime from './visualizations/charts/MsgPerTime.svelte';
	import Wordcloud from './visualizations/charts/Wordcloud.svelte';
	import { countsPerAuthor } from '$lib/analyze/wordCloud';
	import WordSearch from './visualizations/WordSearch/WordSearch.svelte';

	export let messages: Message[];

	const authors = removeDuplicates(messages.map(({ author }) => author));
	const authorColors = arraysToObj(authors, multiplyUntilLength(colors, authors.length));

	const wordcounts = countsPerAuthor({
		authors,
		messages
	});
</script>

<div class="flex justify-center py-12">
	<div class="flex w-[min(96rem,90%)] flex-col items-center justify-stretch">
		<div
			class="grid w-full grid-cols-[repeat(auto-fit,minmax(min(25rem,100%),1fr))] gap-4 px-2 pb-4 md:gap-14 md:px-14"
		>
			{#each authors as author}
				<Person name={author} {messages} color={authorColors[author]} wordcloud={wordcounts} />
			{/each}
		</div>
		<TimeRange {messages} />
		<BigStats {messages} />

		<div class="w-full">
			<h2>Timeline of messages</h2>

			<MsgPerDay {messages} />
		</div>

		<div class="w-full">
			<h2>Wordcloud</h2>

			<Wordcloud counts={wordcounts} {authors} />
		</div>

		<section class="w-full">
			<h2>Messages per</h2>

			<div
				class="grid w-full grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(min(20rem,100%),1fr))]"
			>
				<div><MsgPerPerson {messages} /></div>
				<div><MsgPerMonth {messages} /></div>
				<div><MsgPerWeekday {messages} /></div>
				<div class="col-span-1 sm:col-span-2 md:col-span-3"><MsgPerTime {messages} /></div>
			</div>
		</section>

		<WordSearch {messages} {wordcounts} />
	</div>
</div>
