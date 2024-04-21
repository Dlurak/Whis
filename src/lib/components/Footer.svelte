<script>
	export let height = 0;
</script>

<div
	class="flex h-48 items-center justify-center bg-emerald-400 text-2xl text-white outline"
	bind:clientHeight={height}
>
	<a href="https://github.com/dlurak/whis" class="flex gap-2">
		<object type="image/svg+xml" data="github.svg" class="w-6" title="Github logo" />
		See this on GitHub
	</a>
</div>
