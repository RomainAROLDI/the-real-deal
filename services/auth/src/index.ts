import { Hono } from "hono";
import { logger } from "hono/logger";
import { HTTPException } from "hono/http-exception";
import { jwt, sign, verify } from "hono/jwt";
import { usersTable } from "../src/db/schema";
import { drizzle } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { hashPassword, verifyPassword } from "./utils";

const JWTSecret = process.env.JWT_SECRET;

if (!JWTSecret) throw new Error("JWT_SECRET is required");

const db = drizzle(process.env.DATABASE_URL!);

const api = new Hono().basePath("/auth");

api.use("/auth/verify", (c, next) => {
  const jwtMiddleware = jwt({
    secret: JWTSecret!,
  });
  return jwtMiddleware(c, next);
});

api.use(logger());

api.post("/login", async (c) => {
  const body = await c.req.json<{ email: string; password: string }>();

  if (!body.email || !body.password)
    throw new HTTPException(400, { message: "Email and password are required" });

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, body.email))
    .limit(1)
    .execute();

  if (!user[0]) throw new HTTPException(401, { message: "Invalid email or password" });

  if (!(await verifyPassword(body.password, user[0].password)))
    throw new HTTPException(401, { message: "Invalid email or password" });

  delete (user[0] as { password?: string }).password;

  const token = await sign({ ...user[0] }, JWTSecret!);

  return c.json({ token, user: user[0] });
});

api.post("/register", async (c) => {
  const body = await c.req.json<{ email: string; password: string }>();

  if (!body.email || !body.password) {
    throw new HTTPException(400, { message: "Email and password are required" });
  }

  const hashedPassword = await hashPassword(body.password);

  const userInserted = await db
    .insert(usersTable)
    .values({
      email: body.email,
      password: hashedPassword,
      createdAt: new Date(),
      username: null,
      role: "bettor",
      refreshToken: null,
      lastSignInAt: null,
      updatedAt: new Date(),
      deletedAt: null,
    })
    .execute();

  if (!userInserted[0].insertId) throw new HTTPException(500, { message: "Failed to register" });

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userInserted[0].insertId))
    .limit(1)
    .execute();

  delete (user[0] as { password?: string }).password;

  const token = await sign({ ...user[0] }, JWTSecret!);

  return c.json({ token, user: user[0] });
});

api.get("/verify", async (c) => {
  try {
    const token = c.req.header("Authorization")?.split(" ")[1];

    if (!token) throw new HTTPException(401, { message: "Token is required" });

    const decodedPayload = await verify(token, JWTSecret!);

    return c.json({ user: decodedPayload });
  } catch (_) {
    throw new HTTPException(401, { message: "Invalid token" });
  }
});

export default api;
