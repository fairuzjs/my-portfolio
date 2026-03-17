import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

// POST /api/upload
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "Tidak ada file yang diunggah" }, { status: 400 });
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Format file tidak didukung. Gunakan JPG, PNG, WebP, atau GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "Ukuran file terlalu besar. Maksimum 5MB." },
        { status: 400 }
      );
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `project-${Date.now()}.${ext}`;
    const filepath = path.join(uploadDir, filename);

    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filepath, buffer);

    return NextResponse.json({ url: `/uploads/${filename}` });
  } catch {
    return NextResponse.json(
      { error: "Upload gagal. Coba lagi." },
      { status: 500 }
    );
  }
}
