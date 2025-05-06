import { IUserProvider } from "@/lib/interfaces/user-provider";
import { CreateUserDto, UpdateUserDto } from "@/lib/schemas/user";

export class UserService {
  constructor(private readonly provider: IUserProvider) {}

  createUser(input: CreateUserDto) {
    return this.provider.createUser(input);
  }

  getUser(id: string) {
    return this.provider.getUser(id);
  }

  getUsers() {
    return this.provider.getUsers();
  }

  updateUser(id: string, input: UpdateUserDto) {
    return this.provider.updateUser(id, input);
  }

  deleteUser(id: string) {
    return this.provider.deleteUser(id);
  }
}
