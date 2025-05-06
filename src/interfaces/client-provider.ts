import {
  CreateClientDto,
  UpdateClientDto,
  ClientDto,
} from "@/src/schemas/client";

export interface IClientProvider {
  createClient(data: CreateClientDto): Promise<ClientDto>;
  getClient(id: string): Promise<ClientDto | null>;
  getClients(): Promise<ClientDto[]>;
  updateClient(id: string, data: UpdateClientDto): Promise<ClientDto>;
  deleteClient(id: string): Promise<ClientDto>;
}
