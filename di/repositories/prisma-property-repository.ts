import { prisma } from "@/lib/db/prisma-client";
import { PropertyProvider } from "@/di/interfaces/property-provider";
import { CreateProperty, UpdateProperty } from "@/di/schemas/property";

export class PrismaPropertyRepository implements PropertyProvider {
  createProperty(data: CreateProperty) {
    return prisma.property.create({ data });
  }

  getProperty(id: string) {
    return prisma.property.findUnique({ where: { id } });
  }

  getPropertys() {
    return prisma.property.findMany();
  }

  updateProperty(id: string, data: UpdateProperty) {
    return prisma.property.update({ where: { id }, data });
  }

  deleteProperty(id: string) {
    return prisma.property.delete({ where: { id } });
  }
}
