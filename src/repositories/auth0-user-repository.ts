import { auth0 } from "@/auth0";
import { auth0Management } from "@/auth0/auth0-management";
import { IAuthUserProvider } from "@/src/interfaces/auth-user-provider";
import { CreateAuthUserDto, UpdateAuthUserDto } from "@/src/schemas/auth-user";

export class Auth0UserRepository implements IAuthUserProvider {
  async createUser(data: CreateAuthUserDto) {
    const response = await auth0Management.users.create(data);
    return response.data;
  }

  async getUser(id: string) {
    const response = await auth0Management.users.get({ id });
    return response.data;
  }

  async getCurrentUser() {
    const session = await auth0.getSession();
    return session?.user ?? null;
  }

  async updateUser(auth0Id: string, update: UpdateAuthUserDto) {
    const response = await auth0Management.users.update(
      { id: auth0Id },
      update,
    );
    return response.data;
  }

  async deleteUser(auth0Id: string) {
    const response = await auth0Management.users.delete({ id: auth0Id });
    return response.data;
  }
}
