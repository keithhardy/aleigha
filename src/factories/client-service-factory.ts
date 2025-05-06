import { PrismaClientRepository } from "@/src/repositories/prisma-client-repository";
import { ClientService } from "@/src/services/client-service";

export const clientService = new ClientService(new PrismaClientRepository());
