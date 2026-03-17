import { prisma } from "@/lib/prisma";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
  });
  return <div>{category?.name}</div>;
}
