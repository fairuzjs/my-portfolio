import { NextResponse } from "next/server";
import { readMessagesFile, writeMessagesFile } from "@/lib/messages";

// GET /api/messages  (admin only — protected by middleware)
export async function GET() {
  try {
    const data = await readMessagesFile();
    return NextResponse.json({ messages: data.messages });
  } catch {
    return NextResponse.json(
      { error: "Gagal memuat pesan" },
      { status: 500 }
    );
  }
}

// POST /api/messages  (public — from contact form)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    const data = await readMessagesFile();

    const newMessage = {
      id: `msg-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject).trim(),
      message: String(message).trim(),
      read: false,
      createdAt: new Date().toISOString(),
    };

    data.messages.unshift(newMessage);
    await writeMessagesFile(data);

    return NextResponse.json({ message: newMessage }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan pesan" },
      { status: 500 }
    );
  }
}

// PATCH /api/messages  (mark as read)
export async function PATCH(request: Request) {
  try {
    const { id } = await request.json();
    const data = await readMessagesFile();
    const msg = data.messages.find((m) => m.id === id);
    if (!msg) {
      return NextResponse.json({ error: "Pesan tidak ditemukan" }, { status: 404 });
    }
    msg.read = true;
    await writeMessagesFile(data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal memperbarui pesan" }, { status: 500 });
  }
}

// DELETE /api/messages  (delete a message)
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const data = await readMessagesFile();
    data.messages = data.messages.filter((m) => m.id !== id);
    await writeMessagesFile(data);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Gagal menghapus pesan" }, { status: 500 });
  }
}
