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
  const dbResponse = await sql`CREATE TABLE IF NOT EXISTS "races" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "created_at" timestamp DEFAULT now()
  )`;
  console.log("DB response:: ", dbResponse);
}

configureDb().catch((error) => console.log("DB error:: ", error));
