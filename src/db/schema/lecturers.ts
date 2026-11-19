import { sql } from "drizzle-orm";
import { check, int, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { users } from "./users.js";

export const lecturers = mysqlTable(
  "lecturers",
  {
    id: int().autoincrement().primaryKey(),
    userId: int("user_id")
      .notNull()
      .unique()
      .references(() => users.id, { onDelete: "cascade" }),
    fullName: varchar("full_name", { length: 150 }).notNull(),
    nidn: varchar({ length: 10 }).notNull().unique(),
    avatar: varchar({ length: 500 }),
  },
  (table) => [
    check("nidn_format_check", sql`${table.nidn} REGEXP '^[0-9]{10}$'`),
  ],
);
