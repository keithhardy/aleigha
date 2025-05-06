import {
  CreatePropertyDto,
  UpdatePropertyDto,
  PropertyDto,
} from "@/src/schemas/property";

export interface IPropertyProvider {
  createProperty(data: CreatePropertyDto): Promise<PropertyDto>;
  getProperty(id: string): Promise<PropertyDto | null>;
  getPropertys(): Promise<PropertyDto[]>;
  updateProperty(id: string, data: UpdatePropertyDto): Promise<PropertyDto>;
  deleteProperty(id: string): Promise<PropertyDto>;
}
