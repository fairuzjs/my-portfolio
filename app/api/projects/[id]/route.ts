import { NextResponse } from "next/server";
import { readProjectsFile, writeProjectsFile } from "@/lib/projects";

// GET /api/projects/[id]
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await readProjectsFile();
    const project = data.projects.find((p) => p.id === id);

    if (!project) {
      return NextResponse.json({ error: "Proyek tidak ditemukan" }, { status: 404 });
    }
    return NextResponse.json({ project });
  } catch {
    return NextResponse.json({ error: "Gagal memuat proyek" }, { status: 500 });
  }
}

// PUT /api/projects/[id]
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const data = await readProjectsFile();

    const idx = data.projects.findIndex((p) => p.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Proyek tidak ditemukan" }, { status: 404 });
    }

    // Handle backward compatibility
    let newImages = data.projects[idx].images || [];
    if (body.images) {
      newImages = body.images;
    } else if (body.image) {
      newImages = [body.image];
    }

    // Remove legacy image field if present in body to avoid saving it
    const { image, ...bodyWithoutImage } = body;

    data.projects[idx] = {
      ...data.projects[idx],
      ...bodyWithoutImage,
      images: newImages,
      id, // prevent id change
      updatedAt: new Date().toISOString(),
    };

    // Clean up residual `image` property if it still exists in the original data
    if ("image" in data.projects[idx]) {
      delete (data.projects[idx] as any).image;
    }

    await writeProjectsFile(data);
    return NextResponse.json({ project: data.projects[idx] });
  } catch {
    return NextResponse.json({ error: "Gagal mengupdate proyek" }, { status: 500 });
  }
}

// DELETE /api/projects/[id]
export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await readProjectsFile();

    const idx = data.projects.findIndex((p) => p.id === id);
    if (idx === -1) {
      return NextResponse.json({ error: "Proyek tidak ditemukan" }, { status: 404 });
    }

    data.projects.splice(idx, 1);
    await writeProjectsFile(data);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus proyek" }, { status: 500 });
  }
}
