import {
  CreateAuthUserDto,
  UpdateAuthUserDto,
  AuthUserDto,
} from "@/src/schemas/auth-user";

export interface IAuthUserProvider {
  createUser(data: CreateAuthUserDto): Promise<AuthUserDto>;
  getUser(auth0Id: string): Promise<AuthUserDto | null>;
  updateUser(auth0Id: string, data: UpdateAuthUserDto): Promise<AuthUserDto>;
  deleteUser(auth0Id: string): Promise<void>;
}
