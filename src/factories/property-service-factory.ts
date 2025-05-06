import { PrismaPropertyRepository } from "@/src/repositories/prisma-property-repository";
import { PropertyService } from "@/src/services/property-service";

export const propertyService = new PropertyService(
  new PrismaPropertyRepository(),
);
