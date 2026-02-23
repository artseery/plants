import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Editor from "@/app/plants/editor.client";

export default async function PlantPage({}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div>
      <Editor />
    </div>
  );
}
