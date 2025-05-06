import { CreateUserDto, UpdateUserDto, UserDto } from "@/lib/schemas/user";

export interface IUserProvider {
  createUser(data: CreateUserDto): Promise<UserDto>;
  getUser(id: string): Promise<UserDto>;
  getUsers(): Promise<UserDto[]>;
  updateUser(id: string, data: UpdateUserDto): Promise<UserDto>;
  deleteUser(id: string): Promise<UserDto>;
}
