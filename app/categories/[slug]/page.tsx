import { prisma } from "@/lib/prisma";
import SpeciesList from "@/app/_components/SpeciesList/SpeciesList";
import { notFound } from "next/navigation";
import Navigation from "@/app/_components/Navigation/Navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
  });
  if (!category) {
    notFound();
  }

  const navigation = [
    { name: "Категории", link: "/" },
    { name: category.name, link: `/categories/${category.slug}` },
  ];

  return (
    <section className="container">
      <Navigation navigation={navigation} />
      <SpeciesList categoryId={category.id} />
    </section>
  );
}
