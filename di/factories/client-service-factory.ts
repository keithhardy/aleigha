import { PrismaClientRepository } from "@/di/repositories/prisma-client-repository";
import { ClientService } from "@/di/services/client-service";

export const clientService = new ClientService(new PrismaClientRepository());
