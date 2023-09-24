import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

const role = sqliteTable('role', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').unique()
});

export default role;
