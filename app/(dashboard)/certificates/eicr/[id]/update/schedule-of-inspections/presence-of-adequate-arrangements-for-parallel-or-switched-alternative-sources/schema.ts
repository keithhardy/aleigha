import { z } from "zod";

export const UpdatePresenceOfAdequateArrangementsSchema = z.object({
  id: z.string().cuid(),
  item_2_1: z.string().optional(),
  item_2_2: z.string().optional(),
});
