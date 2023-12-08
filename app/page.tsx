"use server";

import { getLatency } from "@/lib/db";

export default async function Home() {
  const dbHello = await getLatency();
  console.log("Get latency:: ", dbHello);

  return <div>HOME</div>;
}
