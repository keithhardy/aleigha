"use server";

import { User, UserRole } from "@prisma/client";

import { CreateUserInput, UpdateUserInput } from "@/lib/schemas/user-schemas";
import {
  createAuth0User,
  createUser,
  deleteAuth0User,
  deleteUser,
  updateAuth0User,
  updateUser,
} from "@/lib/services/user-services";

export type ServerActionResponse<T> = Promise<{
  status: "success" | "error";
  heading: string;
  message: string;
  payload?: T;
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
    return {
      payload: user,
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
    return {
      payload: user,
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
    await deleteAuth0User(id);
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
