import { CreateClient, UpdateClient, Client } from "@/src/schemas/client";

export interface IClientProvider {
  createClient(data: CreateClient): Promise<Client>;
  getClient(id: string): Promise<Client | null>;
  getClients(): Promise<Client[]>;
  updateClient(id: string, data: UpdateClient): Promise<Client>;
  deleteClient(id: string): Promise<Client>;
}
