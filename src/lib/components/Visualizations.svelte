<script lang="ts">
	import type { Message } from '$lib/files/parseWhatsapp';
	import { multiplyUntilLength } from '$lib/utils/arrays/length';
	import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
	import { colors } from '$lib/utils/colors/colors';
	import { arraysToObj } from '$lib/utils/objects/arrayToObj';
	import BigStats from './visualizations/BigStats.svelte';
	import Person from './visualizations/Person.svelte';
	import TimeRange from './visualizations/TimeRange.svelte';

	import '@carbon/charts-svelte/styles.css';
	import MsgPerPerson from './visualizations/carts/MsgPerPerson.svelte';
	import MsgPerDay from './visualizations/carts/MsgPerDay.svelte';
	import MsgPerWeekday from './visualizations/carts/MsgPerWeekday.svelte';
	import MsgPerMonth from './visualizations/carts/MsgPerMonth.svelte';

	export let messages: Message[];

	const authors = removeDuplicates(messages.map(({ author }) => author));
	const authorColors = arraysToObj(authors, multiplyUntilLength(colors, authors.length));
</script>

<div class="flex justify-center py-12">
	<div class="flex w-[min(96rem,90%)] flex-col items-center justify-stretch">
		<div
			class="grid w-full grid-cols-[repeat(auto-fit,minmax(min(25rem,100%),1fr))] gap-4 px-2 pb-4 md:gap-14 md:px-14"
		>
			{#each authors as author}
				<Person name={author} {messages} color={authorColors[author]} />
			{/each}
		</div>

		<TimeRange {messages} />

		<BigStats {messages} />

		<div class="w-full">
			<h2>Timeline of messages</h2>

			<MsgPerDay {messages} />
		</div>

		<section class="w-full">
			<h2>Messages per</h2>

			<div class="grid w-full grid-cols-1 sm:grid-cols-[repeat(auto-fill,minmax(min(20rem,100%),1fr))] gap-12">
				<div><MsgPerPerson {messages} /></div>
				<div><MsgPerMonth {messages} /></div>
				<div class="col-span-1 sm:col-span-2"><MsgPerWeekday {messages} /></div>
			</div>
		</section>
	</div>
</div>
