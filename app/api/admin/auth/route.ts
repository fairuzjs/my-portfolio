import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// POST /api/admin/auth  → Login
export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD ?? "admin123";

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "Password salah" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
      path: "/",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Login gagal" }, { status: 500 });
  }
}

// DELETE /api/admin/auth  → Logout
export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.set("admin_session", "", {
    maxAge: 0,
    path: "/",
  });
  return NextResponse.json({ success: true });
}
