import { z } from "zod";

export const UpdateContractorClientAndInstallationSchema = z.object({
  id: z.string().cuid(),
  clientId: z.string().cuid(),
  propertyId: z.string().cuid(),
});
