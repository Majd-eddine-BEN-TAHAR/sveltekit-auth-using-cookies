import bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import { fail, redirect } from '@sveltejs/kit';
import { db } from '$lib/server/database.js';
import { user } from '../../../../drizzle/schema/index.js';

const Roles = {
	ADMIN: 1,
	USER: 2
};

export async function load({ locals }) {
	if (locals.user) {
		throw redirect(302, '/dashboard');
	}
}

async function register({ request }) {
	const data = await request.formData();
	const username = data.get('username');
	const password = data.get('password');
	const isAdmin = data.get('admin');

	if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
		return fail(400, { invalid: true });
	}

	// result is an array so i destructed the first item only
	const [userExist] = await db.select().from(user).where(eq(user.username, username));

	if (userExist) {
		return fail(400, { user: true });
	}

	await db.insert(user).values({
		username: username,
		passwordHash: await bcrypt.hash(password, 10),
		userAuthToken: crypto.randomUUID(),
		roleId: Roles[isAdmin === 'on' ? 'ADMIN' : 'USER']
	});
	throw redirect(303, '/login');
}

export const actions = {
	register
};
