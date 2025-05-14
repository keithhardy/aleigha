"use server";

import { revalidatePath } from "next/cache";

import { userService } from "@/di/factories/user-service-factory";
import { CreateUser, User } from "@/di/schemas/user";

export type ServerActionResponse<T = undefined> = Promise<{
  status: "success" | "error";
  message: string;
  data?: T;
}>;

export async function createUserAction(data: CreateUser): ServerActionResponse<User> {
  try {
    const user = await userService.createUser(data);
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
