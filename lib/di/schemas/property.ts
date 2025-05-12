import { z } from "zod";

export const PropertySchema = z.object({
  id: z.string(),
  uprn: z.string(),
  occupier: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreatePropertySchema = z.object({
  uprn: z.string(),
  occupier: z.string(),
  address: z.object({
    create: z.object({
      streetAddress: z.string(),
      city: z.string(),
      county: z.string(),
      postTown: z.string(),
      postCode: z.string(),
      country: z.string(),
    }),
  }),
  client: z.object({
    connect: z.object({
      id: z.string(),
    }),
  }),
});

export const UpdatePropertySchema = z.object({
  uprn: z.string(),
  occupier: z.string(),
  address: z.object({
    update: z.object({
      streetAddress: z.string(),
      city: z.string(),
      county: z.string(),
      postTown: z.string(),
      postCode: z.string(),
      country: z.string(),
    }),
  }),
  client: z.object({
    connect: z.object({
      id: z.string(),
    }),
  }),
});

export type Property = z.infer<typeof PropertySchema>;
export type CreateProperty = z.infer<typeof CreatePropertySchema>;
export type UpdateProperty = z.infer<typeof UpdatePropertySchema>;
