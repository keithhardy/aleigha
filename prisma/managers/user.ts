import { Prisma } from "@prisma/client";

import { prisma } from "@/prisma";

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

export async function getUsers(args?: Prisma.UserFindManyArgs) {
  try {
    return await prisma.user.findMany(args);
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

export async function checkUserEmailExists(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return false;
  }
  return true;
}
