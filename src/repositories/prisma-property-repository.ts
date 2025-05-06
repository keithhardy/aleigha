import { prisma } from "@/prisma";
import { IPropertyProvider } from "@/src/interfaces/property-provider";
import { CreatePropertyDto, UpdatePropertyDto } from "@/src/schemas/property";

export class PrismaPropertyRepository implements IPropertyProvider {
  async createProperty(data: CreatePropertyDto) {
    return prisma.property.create({ data });
  }

  async getProperty(id: string) {
    return prisma.property.findUnique({ where: { id } });
  }

  async getPropertys() {
    return prisma.property.findMany();
  }

  async updateProperty(id: string, data: UpdatePropertyDto) {
    return prisma.property.update({ where: { id }, data });
  }

  async deleteProperty(id: string) {
    return prisma.property.delete({ where: { id } });
  }
}
