import { neon } from "@neondatabase/serverless";
import { createTables } from "./tables";
import { Character } from "./types";

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

export async function getRace(race: string) {
  const [raceDetails] = await sql`SELECT * FROM "races" WHERE name = ${race}`;
  return raceDetails;
}

export async function getRaces() {
  const dbResponse = await sql`SELECT * FROM "races"`;
  return dbResponse;
}

export async function getSubrace(subrace: string) {
  const [subraceDetails] =
    await sql`SELECT * FROM "subraces" WHERE name = ${subrace}`;
  return subraceDetails;
}

export async function getSubraces() {
  const dbResponse = await sql`SELECT * FROM "subraces"`;
  return dbResponse;
}

export async function getClass(classname: string) {
  const [classDetails] =
    await sql`SELECT * FROM "classes" WHERE name = ${classname}`;
  return classDetails;
}

export async function getClasses() {
  const dbResponse = await sql`SELECT * FROM "classes"`;
  return dbResponse;
}

export async function getUser(email: string) {
  const [user] =
    await sql`SELECT id, email, level FROM users WHERE email = ${email}`;

  return user ? user : null;
}

export async function authenticateUser(email: string, password: string) {
  const [user] =
    await sql`SELECT id, email, level FROM users WHERE email = ${email} AND password = ${password}`;

  return user ? user : null;
}

export async function createUser(
  email: string,
  password: string,
  authenticate?: boolean
) {
  let user;

  if (authenticate) {
    user = await authenticateUser(email, password);
    if (user) {
      return { message: "SIGNED IN", user };
    }
  } else {
    user = await getUser(email);
    if (user) {
      return { message: "USER EXISTS", user };
    }
  }

  await sql`INSERT INTO users (email, password)
  VALUES (${email}, ${password})`;

  const createdUser = await getUser(email);

  return { message: "USER CREATED", user: createdUser };
}

export async function getCharacter(characterId: number) {
  const [character] =
    await sql`SELECT * FROM "characters" WHERE id = ${characterId}`;
  return character;
}

export async function getCharacters(userId: number) {
  const dbResponse =
    await sql`SELECT * FROM "characters" WHERE user_id = ${userId}`;
  return dbResponse;
}

export async function createCharacter(character: Character, userId: number) {
  // number input sends as a string.. dumb TS can't tell
  character.age = parseInt(character.age.toString());

  const {
    name,
    gender,
    race,
    class: playableClass,
    height,
    weight,
    hair_colour,
    eye_colour,
    skin_colour,
    age,
    scores: { str, dex, con, int, wis, cha },
  } = character;

  const scoresString = `STR:${str},DEX:${dex},CON:${con},INT:${int},WIS:${wis},CHA:${cha}`;

  // can't get this working so just hardcoding every column ... -_-
  // const createdCharacter = await sql`INSERT INTO characters (${keys},user_id) VALUES ('${values}',${userId})`;
  const createdCharacter =
    await sql`INSERT INTO characters (user_id,name,gender,race,class,height,weight,hair_colour,eye_colour,skin_colour,age,scores)
  VALUES (${userId},${name},${gender},${race},${playableClass},${height},${weight},${hair_colour},${eye_colour},${skin_colour},${age},${scoresString})`;

  return { message: "CREATED CHARACTER" };
}

export async function deleteCharacter(characterId: number) {
  const deleteCharacter =
    await sql`DELETE FROM characters WHERE id = ${characterId}`;

  return { message: "DELETED CHARACTER" };
}
