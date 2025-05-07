import { auth0 } from "@/auth0";
import { auth0Management } from "@/auth0/auth0-management";
import { IAuthProvider } from "@/src/interfaces/auth-provider";
import { CreateUser, UpdateUser } from "@/src/schemas/auth";

export class Auth0AuthRepository implements IAuthProvider {
  async createUser(data: CreateUser) {
    const res = await auth0Management.users.create(data);
    return res.data;
  }

  async getUserByEmail(email: string) {
    const res = await auth0Management.usersByEmail.getByEmail({ email });
    return res.data[0];
  }

  async updateUser(id: string, data: UpdateUser) {
    const res = await auth0Management.users.update({ id }, data);
    return res.data;
  }

  async deleteUser(id: string) {
    const res = await auth0Management.users.delete({ id });
    return res.data;
  }

  async getCurrentUser() {
    const session = await auth0.getSession();
    return session?.user ?? null;
  }
}
