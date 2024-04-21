<script lang="ts">
	import { isApple } from '$lib/utils/strings/os';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { UAParser } from 'ua-parser-js';

	const target = writable<'android' | 'apple'>('android');

	onMount(() => {
		const parser = new UAParser(navigator.userAgent);

		const usesApple = isApple(parser.getOS().name || '');
		target.set(usesApple ? 'apple' : 'android');
	});
</script>

<h2>How to export your chat</h2>

<TabGroup>
	<Tab bind:group={$target} name="tab1" value="apple">
		<span>iOS</span>
	</Tab>
	<Tab bind:group={$target} name="tab1" value="android">
		<span>Android</span>
	</Tab>

	<svelte:fragment slot="panel">
		{#if $target === 'apple'}
			<ul class="list-disc pl-6">
				<li>Open the chat you would like to export on your phone</li>
				<li>Tap on the name of the chat at the very top</li>
				<li>In the chat info scroll at the way to the bottom</li>
				<li>Tap on <b>Export Chat</b> at the very bottom</li>
				<li>Choose <b>Without Media</b></li>
				<li>Tap on <b>Save To Files</b></li>
				<li>Open files and search for the .zip you just saved</li>
				<li>Tap on that .zip to extract it. This will create a _chat.txt file</li>
				<li>Here in Whis select that _chat.txt file</li>
			</ul>
		{:else}
			<div>
				<ul class="list-disc pl-6">
					<li>Open the chat you would like to export on your phone</li>
					<li>Tap <b>More options</b> {`>`} <b>More</b> {`>`} <b>Export chat</b></li>
					<li>Tap <b>Without Media</b></li>
					<li>Save the .txt file</li>
					<li>Select the .txt file here in Whis</li>
				</ul>
			</div>
		{/if}
	</svelte:fragment>
</TabGroup>
