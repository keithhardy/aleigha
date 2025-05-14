import { PrismaPropertyRepository } from "@/di/repositories/prisma-property-repository";
import { PropertyService } from "@/di/services/property-service";

export const propertyService = new PropertyService(new PrismaPropertyRepository());
