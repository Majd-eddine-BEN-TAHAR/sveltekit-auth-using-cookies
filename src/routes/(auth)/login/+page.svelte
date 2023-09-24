<script>
	import { enhance } from '$app/forms';
	export let form;
</script>

<h1>Log in</h1>

<form action="?/login" method="POST" use:enhance>
	<div class="input-group">
		<label for="username">Username</label>
		<input
			name="username"
			id="username"
			type="text"
			required
			title="Please enter at least 6 characters"
		/>
	</div>

	<div class="input-group">
		<label for="password">Password</label>
		<input name="password" id="password" type="password" required />
	</div>

	{#if form?.credentials}
		<p class="error">wrong credentials</p>
	{/if}

	{#if form?.invalid}
		<p class="error">invalid data</p>
	{/if}

	<button type="submit">Log in</button>
</form>

<style>
	.error {
		color: red;
		font-size: 20px;
	}
</style>
