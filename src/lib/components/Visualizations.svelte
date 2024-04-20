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

	export let messages: Message[];

	const authors = removeDuplicates(messages.map(({ author }) => author));
	const authorColors = arraysToObj(authors, multiplyUntilLength(colors, authors.length));
</script>

<div class="flex justify-center">
	<div class="flex w-[min(96rem,90%)] flex-col items-center justify-stretch">
		<div
			class="grid w-full grid-cols-[repeat(auto-fit,minmax(min(25rem,100%),1fr))] gap-14 px-14 py-4"
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

		<section>
			<h2>Messages per</h2>

			<div class="grid grid-cols-4 gap-32">
				<div>
					<MsgPerPerson {messages} />
				</div>

				<div class="col-span-2">
					<MsgPerWeekday {messages} />
				</div>
			</div>
		</section>
	</div>
</div>
