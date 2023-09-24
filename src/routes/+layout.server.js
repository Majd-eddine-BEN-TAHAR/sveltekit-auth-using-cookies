/** @type {import('./$types').PageLoad} */
export async function load({ locals }) {
	// now the user data is avalaible for all the pages
	return {
		user: locals.user
	};
}
