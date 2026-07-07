import { prisma } from "@/lib/prisma";
import SpeciesList from "@/app/_components/SpeciesList/SpeciesList";
import { notFound } from "next/navigation";
import Navigation from "@/app/_components/Navigation/Navigation";

type Props = {
  params: Promise<{ category: string }>;
}

export default async function Page({ params }: Props) {
  const { category } = await params;
  const foundCategory = await prisma.category.findUnique({
    where: { slug: category },
  });
  if (!foundCategory) {
    notFound();
  }

  const navigation = [
    { name: "Категории", link: "/" },
    { name: foundCategory.name, link: `/categories/${foundCategory.slug}` },
  ];

  return (
    <section className="container">
      <Navigation navigation={navigation} />
      <SpeciesList
        categoryId={foundCategory.id}
        categorySlug={foundCategory.slug}
      />
    </section>
  );
}
