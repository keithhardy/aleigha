import { IPropertyProvider } from "@/src/interfaces/property-provider";
import { CreatePropertyDto, UpdatePropertyDto } from "@/src/schemas/property";

export class PropertyService {
  constructor(private readonly provider: IPropertyProvider) {}

  createProperty(input: CreatePropertyDto) {
    return this.provider.createProperty(input);
  }

  getProperty(id: string) {
    return this.provider.getProperty(id);
  }

  getPropertys() {
    return this.provider.getPropertys();
  }

  updateProperty(id: string, input: UpdatePropertyDto) {
    return this.provider.updateProperty(id, input);
  }

  deleteProperty(id: string) {
    return this.provider.deleteProperty(id);
  }
}
