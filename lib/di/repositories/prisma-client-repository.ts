import { prisma } from "@/lib/db/prisma-client";
import { ClientProvider } from "@/lib/di/interfaces/client-provider";
import { CreateClient, UpdateClient } from "@/lib/di/schemas/client";

export class PrismaClientRepository implements ClientProvider {
  createClient(data: CreateClient) {
    return prisma.client.create({ data });
  }

  getClient(id: string) {
    return prisma.client.findUnique({ where: { id } });
  }

  getClients() {
    return prisma.client.findMany();
  }

  updateClient(id: string, data: UpdateClient) {
    return prisma.client.update({ where: { id }, data });
  }

  deleteClient(id: string) {
    return prisma.client.delete({ where: { id } });
  }
}
