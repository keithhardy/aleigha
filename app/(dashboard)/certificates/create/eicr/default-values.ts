import { z } from "zod";

import { schema } from "./schema";

export const DefaultValues: z.infer<typeof schema> = {
  userId: "",
  clientId: "",
  propertyId: "",
};
