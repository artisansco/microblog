import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { nanoid } from "nanoid";

export const usersTable = sqliteTable("users", {
  id: text().primaryKey().$defaultFn(nanoid),
  email: text().unique(),
  name: text(),
  username: text().unique().notNull(),
  bio: text(),
  password: text(),
  created_at: text().notNull().default(sql`CURRENT_TIMESTAMP`),
  updated_at: text().$onUpdate(() => sql`CURRENT_TIMESTAMP`),
});
