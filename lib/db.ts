import { neon } from "@neondatabase/serverless";

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
  await sql`CREATE TABLE IF NOT EXISTS "races" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "created_at" timestamp DEFAULT now()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS "subraces" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "created_at" timestamp DEFAULT now()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS "classes" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "race" text NOT NULL,
    "created_at" timestamp DEFAULT now()
  )`;
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
