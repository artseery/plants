import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs";

function mimeByExt(name: string) {
  const ext = path.extname(name).toLowerCase();

  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".webp":
      return "image/webp";
    case ".gif":
      return "image/gif";
    default:
      return "application/octet-stream";
  }
}

function isSafePath(parts: string[]) {
  return parts.every((p) => /^[a-zA-Z0-9._-]+$/.test(p));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path: parts } = await params;

  if (!isSafePath(parts)) {
    return NextResponse.json({ error: "bad path" }, { status: 400 });
  }

  const fullPath = path.join(process.cwd(), "uploads", ...parts);

  try {
    const file = await readFile(fullPath);

    return new NextResponse(file, {
      headers: {
        "Content-Type": mimeByExt(parts.at(-1) || ""),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
