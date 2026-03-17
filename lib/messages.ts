import { promises as fs } from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "messages.json");

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface MessagesFile {
  messages: Message[];
}

export async function readMessagesFile(): Promise<MessagesFile> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(raw) as MessagesFile;
  } catch {
    return { messages: [] };
  }
}

export async function writeMessagesFile(data: MessagesFile): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
}
