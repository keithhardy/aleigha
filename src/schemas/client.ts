import { z } from "zod";

export const ClientSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  picture: z.string().nullable(),
  appointedPerson: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateClientSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  picture: z.string().optional(),
  appointedPerson: z.string(),
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
});

export const UpdateClientSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  picture: z.string().optional(),
  appointedPerson: z.string(),
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
});

export type ClientDto = z.infer<typeof ClientSchema>;
export type CreateClientDto = z.infer<typeof CreateClientSchema>;
export type UpdateClientDto = z.infer<typeof UpdateClientSchema>;
