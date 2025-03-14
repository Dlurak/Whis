<script lang="ts" context="module">
	function extractSpecials(
		specialTypes: Partial<Record<Message['type'], string>>,
		msges: Message[]
	) {
		return Object.entries(specialTypes)
			.map(([t, userFacing]) => ({
				userFacing,
				amount: msges.filter(({ type }) => type === t).length
			}))
			.filter(({ amount }) => amount > 0);
	}
</script>

<script lang="ts">
	import type { Message } from '$lib/parser/types';
	import { countWords } from '$lib/utils/strings/words';
	import { average, sum } from '$lib/utils/numbers/arthimethic';
	import { count } from '$lib/utils/arrays/count';
	import { findMaxBy } from '$lib/utils/arrays/findMaxBy';
	import { parse } from '@devsnowflake/text-emoji-parser';
	import { blackOrWhiteText } from '$lib/utils/colors/contrast';
	import { emoticon, type Emoticon } from 'emoticon';
	import { regexFromStr } from '$lib/utils/strings/regex';
	import Emoji from './Emoji.svelte';
	import { svocal } from '$lib/utils/svocal';
	import { filterMsges } from '$lib/utils/messages/filter';
	import { ADDITIONAL_EMOTICONS } from '$lib/constants/additionalEmoticons';
	import Floating from '$lib/components/utils/Floating.svelte';

	export let name: string;
	export let color: string;
	export let messages: Message[];
	export let wordcloud: Record<string, Record<string, number>>;

	const fmt = new Intl.NumberFormat().format;
	const wordcount = Object.keys(wordcloud[name]).length;

	const msges = messages.filter((m) => m.author === name);

	const msgLengths = filterMsges(msges).map(({ message }) => countWords(message));

	const longestMessage = findMaxBy(filterMsges(msges), ({ message }) => countWords(message))!;

	const totalWordCount = sum(msgLengths);
	const totalWordCountFormatted = new Intl.NumberFormat('en').format(totalWordCount);

	const entireText = filterMsges(msges)
		.map(({ message }) => message)
		.join(' ');

	const emojiCounts = count(parse(entireText).map(({ text }) => text));
	const emojis: string[] = Object.entries(emojiCounts)
		.sort((a, b) => b[1] - a[1])
		.map(([i]) => i);

	const allEmoticon: Emoticon[] = [...emoticon, ...ADDITIONAL_EMOTICONS];
	const emoticonsRegexes = allEmoticon.flatMap((e) => e.emoticons).map(regexFromStr);
	const emoticonMatchesUnsorted = emoticonsRegexes
		.map((reg) => entireText.match(reg))
		.filter((i) => i) as RegExpMatchArray[];

	const emoticonMatches = emoticonMatchesUnsorted.sort((a, b) => b.length - a.length);

	const findMetadata = (emoji: string) =>
		allEmoticon.find(({ emoticons }) => emoticons.includes(emoji));

	const emojiAmount = svocal('amountEmoji');

	const editedMsgesCount = msges.filter((msg) => msg.type === 'message' && msg.isEdited).length;

	const specialTypes: Partial<Record<Message['type'], string>> = {
		audio: 'Voice Messages',
		sticker: 'Sticker',
		deleted: 'Deleted',
		poll: 'Polls',
		location: 'Locations',
		gif: 'Gifs',
		image: 'Images',
		video: 'Videos',
		contact: 'Contacts'
	};
</script>

<div class="w-full rounded-sm p-4 outline outline-2 outline-gray-300">
	<h3
		class="mb-4 truncate rounded-sm bg-[--bg] px-2 py-4 text-center text-4xl text-[--text-col]"
		style:--bg={color}
		style:--text-col={blackOrWhiteText(color)}
	>
		{name}
	</h3>

	<ul>
		<li>Total words: <b>{totalWordCountFormatted}</b></li>
		<li>Total messages: <b>{fmt(msges.length)}</b></li>
		{#if emojis.length > 0 && $emojiAmount > 0}
			<li>
				Most used emojis:
				{#each emojis.slice(0, $emojiAmount) as e}
					<Emoji emoji={e} amount={emojiCounts[e]} />
				{/each}
			</li>
		{/if}
		{#if emoticonMatches.length > 0 && $emojiAmount > 0}
			<li>
				Most used emoticons:
				<b>
					{#each emoticonMatches.slice(0, $emojiAmount) as e}
						{@const emoji = e[0].trim()}

						<Emoji {emoji} amount={e.length} metadata={findMetadata(emoji)} />
					{/each}
				</b>
			</li>
		{/if}
		<li>
			Longest message:
			<Floating opaque={false}>
				<b slot="main">{countWords(longestMessage.message)}</b>
				<svelte:fragment slot="floating">
					{longestMessage.message}
				</svelte:fragment>
			</Floating>
			Words
		</li>

		{#each extractSpecials(specialTypes, msges) as { userFacing, amount }}
			<li>{userFacing}: <b>{amount}</b></li>
		{/each}
		{#if editedMsgesCount > 0}
			<li>Edited: <b>{editedMsgesCount}</b></li>
		{/if}

		<li>Average words per message: <b>{Math.round(average(msgLengths) * 10) / 10}</b></li>
		<li>Wordstock (unique words used): <b>{fmt(wordcount)}</b></li>
	</ul>
</div>
