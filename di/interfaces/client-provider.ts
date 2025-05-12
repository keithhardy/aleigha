import { CreateClient, UpdateClient, Client } from "@/di/schemas/client";

export interface ClientProvider {
  createClient(data: CreateClient): Promise<Client>;
  getClient(id: string): Promise<Client | null>;
  getClients(): Promise<Client[]>;
  updateClient(id: string, data: UpdateClient): Promise<Client>;
  deleteClient(id: string): Promise<Client>;
}
