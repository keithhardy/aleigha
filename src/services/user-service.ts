import { IAuthProvider } from "@/src/interfaces/auth-provider";
import { IUserProvider } from "@/src/interfaces/user-provider";
import { CreateUser, UpdateUser } from "@/src/schemas/user";

export class UserService {
  constructor(
    private readonly userProvider: IUserProvider,
    private readonly authProvider: IAuthProvider,
  ) {}

  async createUser(password: string, input: CreateUser) {
    await this.authProvider.createUser({
      email: input.email,
      name: input.name,
      password,
    });

    return await this.userProvider.createUser(input);
  }

  getUser(id: string) {
    return this.userProvider.getUser(id);
  }

  getUsers() {
    return this.userProvider.getUsers();
  }

  async updateUser(id: string, input: UpdateUser) {
    const user = await this.userProvider.getUser(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    const auth0User = await this.authProvider.getUserByEmail(user.email);
    if (!auth0User) throw new Error(`User with email ${user.email} not found`);

    await this.authProvider.updateUser(auth0User.id, {
      email: input.email,
      name: input.name,
    });

    return await this.userProvider.updateUser(id, input);
  }

  async deleteUser(id: string) {
    const user = await this.userProvider.getUser(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    const auth0User = await this.authProvider.getUserByEmail(user.email);
    if (!auth0User) throw new Error(`User with email ${user.email} not found`);

    await this.authProvider.deleteUser(auth0User.id);

    return await this.userProvider.deleteUser(id);
  }
}
