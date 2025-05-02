"use server";

import { UserRole } from "@prisma/client";

import { auth0Management } from "@/lib/auth/auth0-management-client";
import { CreateUserInput, UpdateUserInput } from "@/lib/schemas/user-schemas";

import { createUser, deleteUser, updateUser } from "../services/user-services";

export type ServerActionResponse<T> = Promise<{
  status: "success" | "error";
  heading: string;
  message: string;
  payload?: T;
}>;

export async function createUserAction(data: CreateUserInput): ServerActionResponse<void> {
  try {
    const { data: auth0User } = await auth0Management.users.create({
      connection: "Username-Password-Authentication",
      name: data.name,
      email: data.email,
      password: data.password,
    });

    await createUser({
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role as UserRole,
      auth0Id: auth0User.user_id,
    });

    return {
      status: "success",
      heading: "User Created Successfully",
      message: "The new user has been created.",
    };
  } catch {
    return {
      status: "error",
      heading: "User Creation Failed",
      message: "There was an issue creating the user. Please try again.",
    };
  }
}

export async function updateUserAction(id: string, data: UpdateUserInput): ServerActionResponse<void> {
  try {
    await auth0Management.users.update(
      {
        id: data.auth0Id,
      },
      {
        name: data.name,
        email: data.email,
      },
    );

    await updateUser(id, {
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

    return {
      status: "success",
      heading: "User Updated Successfully",
      message: "The user has been updated.",
    };
  } catch {
    return {
      status: "error",
      heading: "User Update Failed",
      message: "There was an issue updating the user. Please try again.",
    };
  }
}

export async function deleteUserAction(id: string): ServerActionResponse<void> {
  try {
    await auth0Management.users.delete({
      id,
    });

    await deleteUser(id);

    return {
      status: "success",
      heading: "User Deleted Successfully",
      message: "The user has been deleted.",
    };
  } catch {
    return {
      status: "error",
      heading: "User Delete Failed",
      message: "There was an issue deleting the user. Please try again.",
    };
  }
}
