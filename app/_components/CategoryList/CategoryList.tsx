import { prisma } from "@/lib/prisma";
import CardsList from "@/app/_components/CardsList/CardsList";

export default async function CategoryList() {
  const categories = await prisma.category.findMany();
  return (
    <CardsList
      items={categories}
      urlBuilder={(slug) => `/categories/${slug}`}
    />
  );
}
