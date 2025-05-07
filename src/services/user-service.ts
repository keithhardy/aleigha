import { IAuthProvider } from "@/src/interfaces/auth-provider";
import { IUserProvider } from "@/src/interfaces/user-provider";
import { CreateUser, UpdateUser } from "@/src/schemas/user";

export class UserService {
  constructor(
    private readonly prismaProvider: IUserProvider,
    private readonly auth0Provider: IAuthProvider,
  ) {}

  createUser(password: string, input: CreateUser) {
    return this.auth0Provider
      .createUser({
        email: input.email,
        name: input.name,
        connection: "Username-Password-Authentication",
        password,
      })
      .then(() => this.prismaProvider.createUser(input));
  }

  getUser(id: string) {
    return this.prismaProvider.getUser(id);
  }

  getUsers() {
    return this.prismaProvider.getUsers();
  }

  updateUser(id: string, input: UpdateUser) {
    return this.prismaProvider.getUser(id).then((user) => {
      if (!user) throw new Error(`User with id ${id} not found`);

      return this.auth0Provider.getUserByEmail(user.email).then((auth0User) => {
        if (!auth0User)
          throw new Error(`User with email ${user.email} not found`);

        return this.auth0Provider
          .updateUser(auth0User.user_id, {
            email: input.email,
            name: input.name,
          })
          .then(() => this.prismaProvider.updateUser(id, input));
      });
    });
  }

  deleteUser(id: string) {
    return this.prismaProvider.getUser(id).then((user) => {
      if (!user) throw new Error(`User with id ${id} not found`);

      return this.auth0Provider.getUserByEmail(user.email).then((auth0User) => {
        if (!auth0User)
          throw new Error(`User with email ${user.email} not found`);

        return this.auth0Provider
          .deleteUser(auth0User.user_id)
          .then(() => this.prismaProvider.deleteUser(id));
      });
    });
  }
}
