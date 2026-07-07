import { prisma } from "@/lib/prisma";
import CardsList from "@/app/_components/CardsList/CardsList";

type Props = {
  categoryId: string;
  categorySlug: string;
}

export default async function SpeciesList({ categoryId, categorySlug }: Props) {
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
