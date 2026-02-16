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

// защита от ../ (path traversal)
function isSafeName(name: string) {
  return /^[a-zA-Z0-9._-]+$/.test(name) && !name.includes("..");
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  // сюда можно вставить проверку авторизации/прав доступа
  // например, по куке/токену и т.п.

  if (!isSafeName(name)) {
    return NextResponse.json({ error: "bad filename" }, { status: 400 });
  }

  const fullPath = path.join(process.cwd(), "uploads", name);

  try {
    const file = await readFile(fullPath);
    return new NextResponse(file, {
      headers: {
        "Content-Type": mimeByExt(name),
        // "Content-Disposition": `attachment; filename="${name}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
}
