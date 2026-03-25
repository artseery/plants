import { prisma } from "@/lib/prisma";

export default async function SpeciesList({
  categoryId,
}: {
  categoryId: string;
}) {
  const species = await prisma.species.findMany({
    where: { categoryId },
  });
  return (
    <div>
      {species.map((item) => (
        <div key={item.id}>{item.name}</div>
      ))}
      <div></div>
    </div>
  );
}
