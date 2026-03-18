import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

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

    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `project-${Date.now()}.${ext}`;

    const buffer = await file.arrayBuffer();

    const { error } = await supabase.storage
      .from("portfolio-images")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("Supabase storage error:", error);
      throw error;
    }

    const { data: publicData } = supabase.storage
      .from("portfolio-images")
      .getPublicUrl(filename);

    return NextResponse.json({ url: publicData.publicUrl });
  } catch (err: any) {
    console.error("Upload handler error:", err);
    return NextResponse.json(
      { error: "Upload gagal. Coba lagi." },
      { status: 500 }
    );
  }
}
