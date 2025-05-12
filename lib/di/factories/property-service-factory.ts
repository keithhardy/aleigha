import { PrismaPropertyRepository } from "@/lib/di/repositories/prisma-property-repository";
import { PropertyService } from "@/lib/di/services/property-service";

export const propertyService = new PropertyService(
  new PrismaPropertyRepository(),
);
