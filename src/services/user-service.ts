import { IAuthUserProvider } from "@/src/interfaces/auth-user-provider";
import { IUserProvider } from "@/src/interfaces/user-provider";
import {
  CreateAuthUserSchema,
  UpdateAuthUserSchema,
} from "@/src/schemas/auth-user";
import { CreateUserDto, UpdateUserDto } from "@/src/schemas/user";

export class UserService {
  constructor(
    private readonly prismaProvider: IUserProvider,
    private readonly auth0Provider: IAuthUserProvider,
  ) {}

  async createUser(input: Omit<CreateUserDto, "auth0Id">, password: string) {
    CreateAuthUserSchema.parse({
      email: input.email,
      name: input.name,
      connection: "Username-Password-Authentication",
      password,
    });

    const auth0User = await this.auth0Provider.createUser({
      email: input.email,
      name: input.name,
      connection: "Username-Password-Authentication",
      password,
    });

    return this.prismaProvider.createUser({
      ...input,
      auth0Id: auth0User.user_id,
    });
  }

  async getUser(id: string) {
    return this.prismaProvider.getUser(id);
  }

  async getUsers() {
    return this.prismaProvider.getUsers();
  }

  async updateUser(id: string, input: UpdateUserDto) {
    const user = await this.prismaProvider.getUser(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    UpdateAuthUserSchema.parse({
      email: input.email,
      name: input.name,
    });

    await this.auth0Provider.updateUser(user.auth0Id, {
      email: input.email,
      name: input.name,
    });

    return this.prismaProvider.updateUser(id, input);
  }

  async deleteUser(id: string) {
    const user = await this.prismaProvider.getUser(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    await this.auth0Provider.deleteUser(user.auth0Id);
    return this.prismaProvider.deleteUser(id);
  }
}
