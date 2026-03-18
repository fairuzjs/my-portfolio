import { supabase } from "./supabase";

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
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    console.error("Error reading messages from Supabase:", error);
    return { messages: [] };
  }

  return { messages: data as Message[] };
}

export async function insertMessage(msg: Partial<Message>) {
  const { data, error } = await supabase
    .from("messages")
    .insert([msg])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function markMessageReadAction(id: string) {
  const { error } = await supabase
    .from("messages")
    .update({ read: true })
    .eq("id", id);
  if (error) throw error;
}

export async function deleteMessageAction(id: string) {
  const { error } = await supabase.from("messages").delete().eq("id", id);
  if (error) throw error;
}
