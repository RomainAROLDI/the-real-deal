import {usersTable} from "../../src/db/schema";
import {drizzle} from 'drizzle-orm/mysql2';
import {hashPassword} from "../../src/utils";

const db = drizzle(process.env.DATABASE_URL!);

const main = async () => {
  console.info('Seeding users...');
  console.info('Seeding bettor...');
  const bettor: typeof usersTable.$inferInsert = {
    username: 'Bettor',
    email: 'bettor@trd.com',
    password: await hashPassword("@User123"),
    role: 'bettor',
    refreshToken: null,
    lastSignInAt: null,
    createdAt: new Date(),
    updatedAt: null
  };
  
  console.info('Seeding bookmaker...');
  const bookmaker: typeof usersTable.$inferInsert = {
    username: 'Bookmaker',
    email: 'bookmaker@trd.com',
    password: await hashPassword("@User123"),
    role: 'bookmaker',
    refreshToken: null,
    lastSignInAt: null,
    createdAt: new Date(),
    updatedAt: null
  };
  
  console.info("Seeding admin...");
  const admin: typeof usersTable.$inferInsert = {
    username: 'Admin',
    email: 'admin@trd.com',
    password: await hashPassword("@Admin123"),
    role: 'admin',
    refreshToken: null,
    lastSignInAt: null,
    createdAt: new Date(),
    updatedAt: null
  };
  
  console.info("Inserting users...");
  await db.insert(usersTable).values([admin, bettor, bookmaker]).execute();
  return console.info("Users inserted successfully");
}

main()