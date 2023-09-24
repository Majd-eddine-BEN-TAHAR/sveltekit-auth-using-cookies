// In SvelteKit a “hook” is just a file that runs every time the SvelteKit server receives a request and lets you modify incoming requests and change the response.
// a hook is exactly like a middleware in express where you fetch some data before you process your coming request, so you may load some data like the user from session storage to avoid doing that in every middleware, so here in veltkit is's the same thing, we will for example fetch the user based on his session token and then we will made that user avalaible for all page to avoid fetching multiple times for every page load
import { db } from '$lib/server/database.js';
import { eq } from 'drizzle-orm';
import { user } from '../drizzle/schema';

const ROLES = {
	1: 'ADMIN',
	2: 'USER'
};

export async function handle({ event, resolve }) {
	const session = event.cookies.get('session');

	if (!session) {
		return await resolve(event);
	}

	const [userData] = await db.select().from(user).where(eq(user.userAuthToken, session));
	if (userData) {
		event.locals.user = {
			username: userData.username,
			role: ROLES[userData.roleId]
		};
	}

	// complete loading the page as usall
	return await resolve(event);
}
