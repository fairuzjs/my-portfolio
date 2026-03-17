import { NextResponse } from "next/server";
import { readProjectsFile, writeProjectsFile } from "@/lib/projects";

// GET /api/projects
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const featuredOnly = searchParams.get("featured") === "true";

    const data = await readProjectsFile();

    const projects = featuredOnly
      ? data.projects.filter((p) => p.featured)
      : data.projects;

    return NextResponse.json({ projects });
  } catch {
    return NextResponse.json(
      { error: "Gagal memuat proyek" },
      { status: 500 }
    );
  }
}

// POST /api/projects
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = await readProjectsFile();

    // Handle backward compatibility if client still sends 'image'
    const imagesArray = body.images 
      ? body.images 
      : body.image ? [body.image] : [];

    const newProject = {
      id: `proj-${Date.now()}`,
      title: body.title ?? "",
      description: body.description ?? "",
      images: imagesArray,
      tags: body.tags ?? [],
      liveUrl: body.liveUrl ?? "",
      githubUrl: body.githubUrl ?? "",
      featured: body.featured ?? false,
      category: body.category ?? "Web App",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    data.projects.unshift(newProject);
    await writeProjectsFile(data);

    return NextResponse.json({ project: newProject }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal menambah proyek" },
      { status: 500 }
    );
  }
}
