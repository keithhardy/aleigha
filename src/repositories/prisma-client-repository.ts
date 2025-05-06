import { prisma } from "@/prisma";
import { IClientProvider } from "@/src/interfaces/client-provider";
import { CreateClientDto, UpdateClientDto } from "@/src/schemas/client";

export class PrismaClientRepository implements IClientProvider {
  async createClient(data: CreateClientDto) {
    return prisma.client.create({ data });
  }

  async getClient(id: string) {
    return prisma.client.findUnique({ where: { id } });
  }

  async getClients() {
    return prisma.client.findMany();
  }

  async updateClient(id: string, data: UpdateClientDto) {
    return prisma.client.update({ where: { id }, data });
  }

  async deleteClient(id: string) {
    return prisma.client.delete({ where: { id } });
  }
}
