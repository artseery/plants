// app/plants/actions.ts
"use server";

import { prisma } from "@/lib/prisma";

export async function savePlant(formData: FormData) {
  const name = formData.get("name") as string;
  // prisma.create / update
}
