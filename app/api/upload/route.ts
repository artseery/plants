import { NextResponse } from "next/server";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const runtime = "nodejs"; // важно: чтобы был Node runtime, не edge

function safeExt(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  // можно ограничить расширения
  const allowed = new Set([".png", ".jpg", ".jpeg", ".webp", ".gif"]);
  return allowed.has(ext) ? ext : "";
}
export async function POST(req: Request) {
  const form = await req.formData();

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadsDir = path.join(process.cwd(), "uploads");
  await mkdir(uploadsDir, { recursive: true });

  // генерим безопасное имя (не доверяем file.name)
  const ext = safeExt(file.name);
  const id = crypto.randomUUID();
  const storedName = `${id}${ext || ""}`;
  const fullPath = path.join(uploadsDir, storedName);

  await writeFile(fullPath, buffer);

  return NextResponse.json({
    success: 1,
    file: {
      url: `/api/files/${storedName}`,
      size: file.size,
      type: file.type,
    },
  });
}
