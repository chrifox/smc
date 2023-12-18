import { neon } from "@neondatabase/serverless";
import { createTables } from "./tables";

const dburl = process.env.DATABASE_URL || "";

const sql = neon(dburl);

export async function getLatency() {
  const start = new Date();
  const [dbResponse] = await sql`SELECT NOW();`;
  const now = dbResponse?.now || "";
  const end = new Date();
  const latency = Math.abs(Number(end) - Number(start));
  return { now, latency };
}

async function configureDb() {
  createTables(sql);
}

configureDb().catch((error) => console.log("DB error:: ", error));

export async function getRaces() {
  const dbResponse = await sql`SELECT * FROM "races"`;
  return dbResponse;
}

export async function getSubraces() {
  const dbResponse = await sql`SELECT * FROM "subraces"`;
  return dbResponse;
}

export async function getClasses() {
  const dbResponse = await sql`SELECT * FROM "classes"`;
  return dbResponse;
}

export async function getCharacters(userId: number) {
  const dbResponse =
    await sql`SELECT * FROM "characters" WHERE user_id = ${userId}`;
  return dbResponse;
}

export async function getUser(email: string) {
  const [user] =
    await sql`SELECT id, email, level FROM users WHERE email = ${email}`;

  return user ? user : null;
}

export async function getUserAccount(userId: number) {
  const [user] = await sql`SELECT * FROM user_details WHERE id = ${userId}`;

  return user ? user : null;
}

export async function authenticateUser(email: string, password: string) {
  const [user] =
    await sql`SELECT id, email, password FROM users WHERE email = ${email} AND password = ${password}`;

  if (user) {
  }
}

export async function createUser(email: string, password: string) {
  const user = await getUser(email);

  if (user) {
    return { message: "USER EXISTS", user };
  }

  await sql`INSERT INTO users (email, password)
  VALUES (${email}, ${password})`;

  const createdUser = await getUser(email);

  return { message: "USER CREATED", user: createdUser };
}
