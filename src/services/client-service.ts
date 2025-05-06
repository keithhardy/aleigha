import { IClientProvider } from "@/src/interfaces/client-provider";
import { CreateClientDto, UpdateClientDto } from "@/src/schemas/client";

export class ClientService {
  constructor(private readonly provider: IClientProvider) {}

  createClient(input: CreateClientDto) {
    return this.provider.createClient(input);
  }

  getClient(id: string) {
    return this.provider.getClient(id);
  }

  getClients() {
    return this.provider.getClients();
  }

  updateClient(id: string, input: UpdateClientDto) {
    return this.provider.updateClient(id, input);
  }

  deleteClient(id: string) {
    return this.provider.deleteClient(id);
  }
}
