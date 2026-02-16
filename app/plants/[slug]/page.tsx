import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Editor from "@/app/plants/[slug]/editor.client";

export default async function PlantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const plant = await prisma.plant.findUnique({
    where: { slug },
  });

  if (!plant) notFound();

  return (
    <main style={{ padding: 24 }}>
      <h1>{plant.name}</h1>
      <Editor slug={slug}></Editor>
      <p>
        <b>slug:</b> {plant.slug}
      </p>
      <p>
        <b>article:</b> {JSON.stringify(plant.article)}
      </p>
      <p>
        <b>created:</b> {plant.createdAt.toISOString()}
      </p>
    </main>
  );
}
