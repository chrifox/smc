import { getLatency } from "@/services/neon/db";

export default async function Home() {
  const dbLatency = await getLatency();
  console.info("SQL DB latency: ", dbLatency);

  return (
    <div>
      <h1>HOME PAGE</h1>
    </div>
  );
}
