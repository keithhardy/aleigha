import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma-client";

export async function createUser(data: Prisma.UserCreateInput) {
  try {
    return await prisma.user.create({ data });
  } catch {
    throw new Error("Failed to create user");
  }
}

export async function getUser(id: string) {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch {
    throw new Error("Failed to get user");
  }
}

export async function getUsers() {
  try {
    return await prisma.user.findMany();
  } catch {
    throw new Error("Failed to get users");
  }
}

export async function updateUser(id: string, data: Prisma.UserUpdateInput) {
  try {
    return await prisma.user.update({ where: { id }, data });
  } catch {
    throw new Error("Failed to update user");
  }
}

export async function deleteUser(id: string) {
  try {
    return await prisma.user.delete({ where: { id } });
  } catch {
    throw new Error("Failed to delete user");
  }
}
