import { NeonQueryFunction } from "@neondatabase/serverless";

export async function createTables(sql: NeonQueryFunction<false, false>) {
  await sql`CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY,
    "email" text NOT NULL UNIQUE,
    "password" text NOT NULL,
    "level" int NOT NULL DEFAULT 0,
    "created_at" timestamp DEFAULT now()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS "characters" (
    "id" serial PRIMARY KEY,
    "user_id" int NOT NULL,
    "name" text NOT NULL,
    "gender" text,
    "race" text NOT NULL,
    "subrace" text,
    "class" text NOT NULL,
    "level" int NOT NULL DEFAULT 1,
    "hair_colour" text,
    "eye_colour" text,
    "skin_colour" text,
    "age" int NOT NULL,
    "height" int NOT NULL,
    "weight" int NOT NULL,
    "created_at" timestamp DEFAULT now()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS "races" (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "display_name" text NOT NULL,
    "size" text NOT NULL,
    "speed" int NOT NULL DEFAULT 30,
    "ability2" text NOT NULL,
    "ability1" text,
    "created_at" timestamp DEFAULT now()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS "subraces" (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "created_at" timestamp DEFAULT now()
  )`;

  await sql`CREATE TABLE IF NOT EXISTS "classes" (
    "id" serial PRIMARY KEY,
    "name" text NOT NULL,
    "display_name" text NOT NULL,
    "hit_dice" int NOT NULL,
    "primary_stat" text NOT NULL,
    "saving_throws" text NOT NULL,
    "created_at" timestamp DEFAULT now()
  )`;
}
