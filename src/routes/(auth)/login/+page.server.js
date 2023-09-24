import { eq, sql } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import { db } from '$lib/server/database.js';
import { user } from './../../../../drizzle/schema';

export async function load({ locals }) {
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}
}
async function login({ request, cookies }) {
	const formData = await request.formData();
	const username = formData.get('username');
	const password = formData.get('password');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return fail(400, { invalid: true });
	}

	const [currentUser] = await db.select().from(user).where(eq(user.username, username));
	if (!currentUser) {
		return fail(400, { credentials: true });
	}

	const passwordMatch = await bcrypt.compare(password, currentUser.passwordHash);
	if (!passwordMatch) {
		return fail(400, { credentials: true });
	}

	// generate a new auth token each time the user logs in
	const newAuthToken = crypto.randomUUID();

	await db
		.update(user)
		.set({ userAuthToken: newAuthToken, updatedAt: sql`CURRENT_TIMESTAMP` })
		.where(eq(user.username, currentUser.username));

	// add the token to the cookie
	cookies.set('session', newAuthToken, {
		// send cookie for every page
		path: '/',
		// server side only cookie so you can't use `document.cookie`
		httpOnly: true,
		// only requests from same site can send cookies
		// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
		sameSite: 'strict',
		// only sent over HTTPS in production
		secure: process.env.NODE_ENV === 'production',
		// set cookie to expire after a month
		maxAge: 60 * 60 * 24 * 30
	});

	throw redirect(302, '/dashboard');
}

export const actions = { login };
