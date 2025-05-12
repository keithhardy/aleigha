import { PropertyProvider } from "@/lib/di/interfaces/property-provider";
import { CreateProperty, UpdateProperty } from "@/lib/di/schemas/property";

export class PropertyService {
  constructor(private readonly propertyProvider: PropertyProvider) {}

  createProperty(input: CreateProperty) {
    return this.propertyProvider.createProperty(input);
  }

  getProperty(id: string) {
    return this.propertyProvider.getProperty(id);
  }

  getPropertys() {
    return this.propertyProvider.getPropertys();
  }

  updateProperty(id: string, input: UpdateProperty) {
    return this.propertyProvider.updateProperty(id, input);
  }

  deleteProperty(id: string) {
    return this.propertyProvider.deleteProperty(id);
  }
}
