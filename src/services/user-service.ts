import { IAuthProvider } from "@/src/interfaces/auth-provider";
import { IUserProvider } from "@/src/interfaces/user-provider";
import { CreateUser, UpdateUser } from "@/src/schemas/user";

export class UserService {
  constructor(
    private readonly userProvider: IUserProvider,
    private readonly authProvider: IAuthProvider,
  ) {}

  async createUser(input: CreateUser) {
    await this.authProvider.createUser(input);
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

    const authUser = await this.authProvider.getUserByEmail(user.email);
    if (!authUser) throw new Error(`User with email ${user.email} not found`);

    await this.authProvider.updateUser(authUser.id, {
      email: input.email,
      name: input.name,
    });

    return await this.userProvider.updateUser(id, input);
  }

  async deleteUser(id: string) {
    const user = await this.userProvider.getUser(id);
    if (!user) throw new Error(`User with id ${id} not found`);

    const authUser = await this.authProvider.getUserByEmail(user.email);
    if (!authUser) throw new Error(`User with email ${user.email} not found`);

    await this.authProvider.deleteUser(authUser.id);

    return await this.userProvider.deleteUser(id);
  }
}
