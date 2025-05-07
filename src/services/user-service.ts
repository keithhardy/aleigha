import { IAuthProvider } from "@/src/interfaces/auth-provider";
import { IUserProvider } from "@/src/interfaces/user-provider";
import { CreateUser, UpdateUser } from "@/src/schemas/user";

export class UserService {
  constructor(
    private readonly prismaProvider: IUserProvider,
    private readonly auth0Provider: IAuthProvider,
  ) {}

  async createUser(password: string, input: CreateUser) {
    await this.auth0Provider.createUser({
      email: input.email,
      name: input.name,
      connection: "Username-Password-Authentication",
      password,
    });

    return await this.prismaProvider.createUser(input);
  }

  getUser(id: string) {
    return this.prismaProvider.getUser(id);
  }

  getUsers() {
    return this.prismaProvider.getUsers();
  }

  async updateUser(id: string, input: UpdateUser) {
    const user = await this.prismaProvider.getUser(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    const auth0User = await this.auth0Provider.getUserByEmail(user.email);
    if (!auth0User) throw new Error(`User with email ${user.email} not found`);

    await this.auth0Provider.updateUser(auth0User.user_id, {
      email: input.email,
      name: input.name,
    });

    return await this.prismaProvider.updateUser(id, input);
  }

  async deleteUser(id: string) {
    const user = await this.prismaProvider.getUser(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    const auth0User = await this.auth0Provider.getUserByEmail(user.email);
    if (!auth0User) throw new Error(`User with email ${user.email} not found`);

    await this.auth0Provider.deleteUser(auth0User.user_id);

    return await this.prismaProvider.deleteUser(id);
  }
}
