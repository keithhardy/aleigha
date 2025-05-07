import { auth0 } from "@/auth0";
import { auth0Management } from "@/auth0/auth0-management";
import { IAuthProvider } from "@/src/interfaces/auth-provider";
import { CreateUser, UpdateUser } from "@/src/schemas/auth";

export class Auth0AuthRepository implements IAuthProvider {
  createUser(data: CreateUser) {
    return auth0Management.users.create(data).then((res) => res.data);
  }

  getUser(id: string) {
    return auth0Management.users.get({ id }).then((res) => res.data);
  }

  updateUser(id: string, data: UpdateUser) {
    return auth0Management.users.update({ id }, data).then((res) => res.data);
  }

  deleteUser(id: string) {
    return auth0Management.users.delete({ id }).then((res) => res.data);
  }

  getCurrentUser() {
    return auth0.getSession().then((session) => session?.user ?? null);
  }
}
