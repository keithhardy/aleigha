import { CreateUserDto, UpdateUserDto, UserDto } from "@/src/schemas/user";

export interface IUserProvider {
  createUser(data: CreateUserDto): Promise<UserDto>;
  getUser(id: string): Promise<UserDto | null>;
  getUsers(): Promise<UserDto[]>;
  updateUser(id: string, data: UpdateUserDto): Promise<UserDto>;
  deleteUser(id: string): Promise<UserDto>;
}
