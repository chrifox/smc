import { getLatency } from "@/services/neon/db";

export default async function Home() {
  const dbLatency = await getLatency();
  console.log("Get latency:: ", dbLatency);

  return <h1>HOME PAGE</h1>;
}
