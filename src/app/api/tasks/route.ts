import { getTasks } from "@/lib/paperclip";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tasks = await getTasks();
    return NextResponse.json({ tasks });
  } catch {
    return NextResponse.json({ tasks: [] }, { status: 502 });
  }
}
