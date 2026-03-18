import { NextResponse } from "next/server";
import { readProjectsFile, upsertProject } from "@/lib/projects";

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

    // Handle backward compatibility if client still sends 'image'
    const imagesArray = body.images 
      ? body.images 
      : body.image ? [body.image] : [];

    // Ensure category is always an array
    const catArray = Array.isArray(body.category) 
      ? body.category 
      : typeof body.category === "string" 
      ? [body.category] 
      : ["Web App"];

    const newProject = {
      id: `proj-${Date.now()}`,
      title: body.title ?? "",
      description: body.description ?? "",
      images: imagesArray,
      tags: body.tags ?? [],
      liveUrl: body.liveUrl ?? "",
      githubUrl: body.githubUrl ?? "",
      featured: body.featured ?? false,
      category: catArray,
      // createdAt and updatedAt will be handled by DB defaults if not provided,
      // but we can pass them explicitely if we want.
    };

    const inserted = await upsertProject(newProject);

    return NextResponse.json({ project: inserted }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal menambah proyek" },
      { status: 500 }
    );
  }
}
