import { ClientProvider } from "@/lib/di/interfaces/client-provider";
import { CreateClient, UpdateClient } from "@/lib/di/schemas/client";

export class ClientService {
  constructor(private readonly clientProvider: ClientProvider) {}

  createClient(input: CreateClient) {
    return this.clientProvider.createClient(input);
  }

  getClient(id: string) {
    return this.clientProvider.getClient(id);
  }

  getClients() {
    return this.clientProvider.getClients();
  }

  updateClient(id: string, input: UpdateClient) {
    return this.clientProvider.updateClient(id, input);
  }

  deleteClient(id: string) {
    return this.clientProvider.deleteClient(id);
  }
}
