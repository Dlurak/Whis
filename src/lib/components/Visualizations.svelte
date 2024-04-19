<script lang="ts">
	import type { Message } from '$lib/files/parseWhatsapp';
	import { removeDuplicates } from '$lib/utils/arrays/removeDuplicates';
	import { colors } from '$lib/utils/colors/colors';
	import { arraysToObj } from '$lib/utils/objects/arrayToObj';
	import Person from './visualizations/Person.svelte';
	import TimeRange from './visualizations/TimeRange.svelte';

	export let messages: Message[];

	const authors = removeDuplicates(messages.map(({ author }) => author));
	const authorColors = arraysToObj(authors, colors);
</script>

<div class="flex justify-center">
	<div class="w-[96rem] flex flex-col items-center justify-stretch">
		<div
			class="grid w-full grid-cols-[repeat(auto-fit,minmax(min(25rem,100%),1fr))] gap-14 px-14 py-4"
		>
			{#each authors as author}
				<Person name={author} {messages} color={authorColors[author]} />
			{/each}
		</div>

		<TimeRange {messages} />
	</div>
</div>
