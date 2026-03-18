import { NextResponse } from "next/server";
import { readProjectsFile, upsertProject, deleteProjectAction } from "@/lib/projects";

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
    const existingProject = data.projects.find((p) => p.id === id);

    if (!existingProject) {
      return NextResponse.json({ error: "Proyek tidak ditemukan" }, { status: 404 });
    }

    // Handle backward compatibility
    let newImages = existingProject.images || [];
    if (body.images) {
      newImages = body.images;
    } else if (body.image) {
      newImages = [body.image];
    }

    // Remove legacy image field if present in body to avoid saving it
    const { image, ...bodyWithoutImage } = body;

    const updatedProjectData = {
      ...existingProject,
      ...bodyWithoutImage,
      images: newImages,
      id, // prevent id change
    };

    const updatedProject = await upsertProject(updatedProjectData);

    return NextResponse.json({ project: updatedProject });
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
    await deleteProjectAction(id);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus proyek" }, { status: 500 });
  }
}
