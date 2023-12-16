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
