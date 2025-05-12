import { auth0Management } from "@/lib/auth/auth0-management-client";
import { AuthProvider } from "@/lib/di/interfaces/auth-provider";
import { CreateUser, UpdateUser } from "@/lib/di/schemas/auth";

export class Auth0AuthRepository implements AuthProvider {
  async createUser(data: CreateUser) {
    const res = await auth0Management.users.create({
      ...data,
      connection: "Username-Password-Authentication",
    });

    const createdUser = res.data;

    return {
      id: createdUser.user_id,
      name: createdUser.name,
      email: createdUser.email,
    };
  }

  async getUserByEmail(email: string) {
    const res = await auth0Management.usersByEmail.getByEmail({ email });
    const user = res.data[0];

    return user
      ? {
          id: user.user_id,
          name: user.name,
          email: user.email,
        }
      : null;
  }

  async updateUser(id: string, data: UpdateUser) {
    const res = await auth0Management.users.update({ id }, data);

    const updatedUser = res.data;

    return {
      id: updatedUser.user_id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }

  async deleteUser(id: string) {
    const res = await auth0Management.users.delete({ id });
    return res.data;
  }
}
