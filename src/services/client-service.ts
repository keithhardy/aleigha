import { IClientProvider } from "@/src/interfaces/client-provider";
import { CreateClient, UpdateClient } from "@/src/schemas/client";

export class ClientService {
  constructor(private readonly provider: IClientProvider) {}

  createClient(input: CreateClient) {
    return this.provider.createClient(input);
  }

  getClient(id: string) {
    return this.provider.getClient(id);
  }

  getClients() {
    return this.provider.getClients();
  }

  updateClient(id: string, input: UpdateClient) {
    return this.provider.updateClient(id, input);
  }

  deleteClient(id: string) {
    return this.provider.deleteClient(id);
  }
}
