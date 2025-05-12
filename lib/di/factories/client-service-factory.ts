import { PrismaClientRepository } from "@/lib/di/repositories/prisma-client-repository";
import { ClientService } from "@/lib/di/services/client-service";

export const clientService = new ClientService(new PrismaClientRepository());
