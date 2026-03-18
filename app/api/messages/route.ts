import { NextResponse } from "next/server";
import {
  readMessagesFile,
  insertMessage,
  markMessageReadAction,
  deleteMessageAction,
} from "@/lib/messages";

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

    const newMessage = {
      id: `msg-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject).trim(),
      message: String(message).trim(),
      read: false,
    };

    const inserted = await insertMessage(newMessage);

    return NextResponse.json({ message: inserted }, { status: 201 });
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
    await markMessageReadAction(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal memperbarui pesan" },
      { status: 500 }
    );
  }
}

// DELETE /api/messages  (delete a message)
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await deleteMessageAction(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal menghapus pesan" },
      { status: 500 }
    );
  }
}
