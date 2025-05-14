"use server";

import { revalidatePath } from "next/cache";

import { userService } from "@/di/factories/user-service-factory";
import { UpdateUser, User } from "@/di/schemas/user";

export type ServerActionResponse<T = undefined> = Promise<{
  status: "success" | "error";
  message: string;
  data?: T;
}>;

export async function updateUserAction(id: string, data: UpdateUser): ServerActionResponse<User> {
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
