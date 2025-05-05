"use server";

import { User, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { CreateUserInput, UpdateUserInput } from "@/lib/schemas/user";
import {
  createAuth0User,
  createUser,
  deleteAuth0User,
  deleteUser,
  updateAuth0User,
  updateUser,
} from "@/lib/services/user";

export type ServerActionResponse<T = undefined> = Promise<{
  status: "success" | "error";
  message: string;
  data?: T;
}>;

export async function createUserAction(
  data: CreateUserInput,
): ServerActionResponse<User> {
  try {
    const auth0User = await createAuth0User({
      connection: "Username-Password-Authentication",
      name: data.name,
      email: data.email,
      password: data.password,
    });
    const user = await createUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role as UserRole,
      auth0Id: auth0User.user_id,
    });
    revalidatePath("/users");
    return {
      status: "success",
      message: "The new user has been created.",
      data: user,
    };
  } catch {
    return {
      status: "error",
      message: "There was an issue creating the user. Please try again.",
    };
  }
}

export async function updateUserAction(
  id: string,
  data: UpdateUserInput,
): ServerActionResponse<User> {
  try {
    await updateAuth0User(id, {
      name: data.name,
      email: data.email,
    });
    const user = await updateUser(id, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      signature: data.signature,
      role: data.role as UserRole,
      clients: {
        connect: data.clients.connect,
        disconnect: data.clients.disconnect,
      },
    });
    revalidatePath("/users");
    return {
      status: "success",
      message: "The user has been updated.",
      data: user,
    };
  } catch {
    return {
      status: "error",
      message: "There was an issue updating the user. Please try again.",
    };
  }
}

export async function deleteUserAction(id: string): ServerActionResponse<void> {
  try {
    await deleteAuth0User(id);
    await deleteUser(id);
    revalidatePath("/users");
    return {
      status: "success",
      message: "The user has been deleted.",
    };
  } catch {
    return {
      status: "error",
      message: "There was an issue deleting the user. Please try again.",
    };
  }
}
