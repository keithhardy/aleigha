import { z } from "zod";

export const UpdateContractorClientAndInstallationSchema = z.object({
  id: z.string().cuid(),
  clientId: z.string().cuid("Please select a client"),
  propertyId: z.string().cuid("Please select a property"),
});
