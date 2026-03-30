import { prisma } from "@/lib/prisma";
import CardsList from "@/app/_components/CardsList/CardsList";

export default async function SpeciesList({
  categoryId,
  categorySlug,
}: {
  categoryId: string;
  categorySlug: string;
}) {
  const species = await prisma.species.findMany({
    where: { categoryId },
  });
  return (
    <CardsList
      items={species}
      urlBuilder={(slug) => `/categories/${categorySlug}/${slug}`}
    />
  );
}
