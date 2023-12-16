import { NeonQueryFunction } from "@neondatabase/serverless";

export async function createTables(sql: NeonQueryFunction<false, false>) {
  await sql`CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" text NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL,
    "level" varchar(1) NOT NULL DEFAULT 0,
    "created_at" timestamp DEFAULT now()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS "characters" (
    "id" serial PRIMARY KEY NOT NULL,
    "user_id" text NOT NULL,
    "name" text NOT NULL,
    "level" varchar(2) NOT NULL DEFAULT 1,
    "created_at" timestamp DEFAULT now()
  )`;

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
