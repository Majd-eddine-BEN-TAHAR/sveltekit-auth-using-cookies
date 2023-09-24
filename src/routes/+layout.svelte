<script>
	import { page } from '$app/stores';
	import './../app.css';

	$: currentUrl = $page.url.pathname;
</script>

<svelte:head>
	<title>SvelteKit Auth</title>
</svelte:head>

<main>
	<slot />
</main>

<nav>
	{#if !$page.data.user}
		<a href="/register">Register</a>
		<a href="/login">Login</a>
	{/if}

	{#if $page.data.user?.role === 'ADMIN' && currentUrl !== '/admin'}
		<a href="/admin">Admin</a>
	{/if}

	{#if $page.data.user && currentUrl !== '/dashboard'}
		<a href="/dashboard">dashboard</a>
	{/if}

	{#if $page.data.user}
		<form action="/logout" method="POST">
			<button type="submit">Log out</button>
		</form>
	{/if}
</nav>
