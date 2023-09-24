import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	// redirect user if not logged in
	if (!locals.user || locals.user?.role !== 'ADMIN') {
		throw redirect(302, '/dashboard');
	}
};
