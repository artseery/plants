import { prisma } from "@/lib/prisma";
import { Key } from "react";
export default async function Plants() {
  const plants = await prisma.plant.findMany({
    orderBy: { createdAt: "desc" },
  });
  return (
    <main>
      <h1>Plants</h1>
      <ul>
        {plants.map((p: { id: Key; name: string; slug: string }) => (
          <li key={p.id}>
            {p.name} ({p.slug})
          </li>
        ))}
      </ul>
    </main>
  );
}
