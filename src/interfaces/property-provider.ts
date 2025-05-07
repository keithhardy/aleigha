import {
  CreateProperty,
  UpdateProperty,
  Property,
} from "@/src/schemas/property";

export interface IPropertyProvider {
  createProperty(data: CreateProperty): Promise<Property>;
  getProperty(id: string): Promise<Property | null>;
  getPropertys(): Promise<Property[]>;
  updateProperty(id: string, data: UpdateProperty): Promise<Property>;
  deleteProperty(id: string): Promise<void>;
}
