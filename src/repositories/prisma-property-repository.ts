import { prisma } from "@/prisma";
import { IPropertyProvider } from "@/src/interfaces/property-provider";
import { CreateProperty, UpdateProperty } from "@/src/schemas/property";

export class PrismaPropertyRepository implements IPropertyProvider {
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
