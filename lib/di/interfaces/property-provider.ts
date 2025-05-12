import {
  CreateProperty,
  UpdateProperty,
  Property,
} from "@/lib/di/schemas/property";

export interface PropertyProvider {
  createProperty(data: CreateProperty): Promise<Property>;
  getProperty(id: string): Promise<Property | null>;
  getPropertys(): Promise<Property[]>;
  updateProperty(id: string, data: UpdateProperty): Promise<Property>;
  deleteProperty(id: string): Promise<Property>;
}
