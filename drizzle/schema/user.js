import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import role from './role';

const user = sqliteTable('user', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	username: text('username').unique(),
	passwordHash: text('passwordHash'),
	userAuthToken: text('userAuthToken').unique(),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`),
	updatedAt: text('updated_at').default(sql`CURRENT_TIMESTAMP`),
	roleId: integer('role_id').references(() => role.id)
});

export default user;
