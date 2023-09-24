<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<h1>Register</h1>

<form action="?/register" method="POST" use:enhance>
	<div class="input-group">
		<label for="username">Username</label>
		<input name="username" id="username" type="text" required />
	</div>

	<div class="input-group">
		<label for="password">Password</label>
		<input name="password" id="password" type="password" required />
	</div>

	<div class="input-group">
		<label for="admin">admin</label>
		<input name="admin" id="admin" type="checkbox" />
	</div>

	{#if form?.user}
		<p class="error">username is taken</p>
	{/if}

	{#if form?.invalid}
		<p class="error">invalid data</p>
	{/if}

	<button type="submit">Register</button>
</form>

<style>
	.error {
		color: red;
		font-size: 20px;
	}
</style>
