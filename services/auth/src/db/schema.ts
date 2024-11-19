import {
  mysqlTable,
  varchar,
  datetime,
  serial,
  primaryKey,
  unique,
  mysqlEnum,
  int,
} from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("user", {
  id: int().notNull().autoincrement().primaryKey(),
  username: varchar({ length: 50 }),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: mysqlEnum(["bettor", "bookmaker", "admin"]).notNull().default("bettor"),
  refreshToken: varchar({ length: 255 }),
  lastSignInAt: datetime(),
  createdAt: datetime().notNull(),
  updatedAt: datetime().$onUpdateFn(() => new Date()),
  deletedAt: datetime(),
});
