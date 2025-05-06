"use server";

import { revalidatePath } from "next/cache";

import { createAuth0User, deleteAuth0User, updateAuth0User } from "@/auth0";
import { userService } from "@/src/factories/user-service-factory";
import { CreateUserDto, UpdateUserDto, UserDto } from "@/src/schemas/user";

export type ServerActionResponse<T = undefined> = Promise<{
  status: "success" | "error";
  message: string;
  data?: T;
}>;

export async function createUserAction(
  data: CreateUserDto,
): ServerActionResponse<UserDto> {
  try {
    const auth0User = await createAuth0User({
      connection: "Username-Password-Authentication",
      name: data.name,
      email: data.email,
      // password: data.password,
    });
    const user = await userService.createUser({
      auth0Id: auth0User.user_id,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
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
  data: UpdateUserDto,
): ServerActionResponse<UserDto> {
  try {
    await updateAuth0User(id, {
      name: data.name,
      email: data.email,
    });
    const user = await userService.updateUser(id, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      signature: data.signature,
      role: data.role,
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
    await userService.deleteUser(id);
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
