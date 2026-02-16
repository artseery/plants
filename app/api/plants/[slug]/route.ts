import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const body = await req.json(); // { name, article }

  const plant = await prisma.plant.upsert({
    where: { slug },
    create: { slug, name: body.name ?? slug, article: body.article },
    update: { name: body.name ?? slug, article: body.article },
  });

  return NextResponse.json({ ok: true, plant });
}
