import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { role } from './../../../drizzle/schema/index';
import { eq } from 'drizzle-orm';

async function checkAndInsertRoles(db) {
	// Check if "ADMIN" and "USER" exist in the Role table
	const [adminRole] = await db.select().from(role).where(eq(role.name, 'ADMIN'));

	const [userRole] = await db.select().from(role).where(eq(role.name, 'USER'));

	if (!adminRole) {
		await db.insert(role).values({ name: 'ADMIN' });
	}
	if (!userRole) {
		await db.insert(role).values({ name: 'USER' });
	}
}

const sqlite = new Database('sqlite.db');

const db = drizzle(sqlite);

checkAndInsertRoles(db);
// this migrate function will execute automatically any new migrations files that was generated into the drizzle folder but always you need to run the generate command first manually
migrate(db, { migrationsFolder: 'migrations' });

export { db };
