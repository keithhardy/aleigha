import { NextResponse } from "next/server";

import { createUser, getUsers } from "@/lib/services/user-services";

export async function GET() {
  try {
    const users = await getUsers();
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: "Failed to get users" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const user = await createUser(body);
    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
