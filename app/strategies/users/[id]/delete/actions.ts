"use server";

import { revalidatePath } from "next/cache";

import { userService } from "@/di/factories/user-service-factory";

export type ServerActionResponse<T = undefined> = Promise<{
  status: "success" | "error";
  message: string;
  data?: T;
}>;

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
