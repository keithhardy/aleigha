import { NextResponse } from "next/server";

import { userService } from "@/src/factories/user-service-factory";

export async function GET() {
  try {
    const users = await userService.getUsers();
    return NextResponse.json(users, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to get users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const user = await userService.createUser(
      {
        name: data.name,
        email: data.email,
        phone: data.phone,
        role: data.role,
      },
      data.password,
    );
    return NextResponse.json(user, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
