/** @type { import("drizzle-kit").Config } */
export default {
	schema: './drizzle/schema/index.js',
	driver: 'better-sqlite',
	dbCredentials: {
		url: './sqlite.db'
	},
	out: './migrations'
};
