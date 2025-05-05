import { UserCreate, UserUpdate } from "auth0";

import { auth0Management } from "../management";
import { auth0 } from "../client";

export async function getAuth0User() {
  try {
    return (await auth0.getSession())?.user.sub;
  } catch {
    return null;
  }
}

export async function createAuth0User(data: UserCreate) {
  try {
    return (await auth0Management.users.create(data)).data;
  } catch {
    throw new Error("Failed to create user");
  }
}

export async function updateAuth0User(id: string, data: UserUpdate) {
  try {
    return await auth0Management.users.update({ id }, data);
  } catch {
    throw new Error("Failed to update user");
  }
}

export async function deleteAuth0User(id: string) {
  try {
    return await auth0Management.users.delete({ id });
  } catch {
    throw new Error("Failed to delete user");
  }
}
