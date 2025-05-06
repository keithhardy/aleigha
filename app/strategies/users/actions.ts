"use server";

import { revalidatePath } from "next/cache";

import { userService } from "@/src/factories/user-service-factory";
import { CreateUserDto, UpdateUserDto, UserDto } from "@/src/schemas/user";

export type ServerActionResponse<T = undefined> = Promise<{
  status: "success" | "error";
  message: string;
  data?: T;
}>;

export async function createUserAction(
  password: string,
  data: Omit<CreateUserDto, "auth0Id">,
): ServerActionResponse<UserDto> {
  try {
    const user = await userService.createUser(password, data);
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
    const user = await userService.updateUser(id, data);
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
