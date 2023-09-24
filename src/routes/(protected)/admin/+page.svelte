<script>
	import { page } from '$app/stores';
</script>

<h1>Admin panel</h1>

{#if $page.data.user}
	<h3>Welcome {$page.data.user.username}!</h3>
{/if}

<style>
	h3 {
		padding: 10px;
		margin: 10px;
		color: dodgerblue;
	}
</style>
