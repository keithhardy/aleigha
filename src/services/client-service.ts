import { IClientProvider } from "@/src/interfaces/client-provider";
import { CreateClient, UpdateClient } from "@/src/schemas/client";

export class ClientService {
  constructor(private readonly clientProvider: IClientProvider) {}

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
