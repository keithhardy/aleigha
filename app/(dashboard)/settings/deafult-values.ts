import { z } from "zod";

import { schema } from "./schema";

export const DefaultValues: z.infer<typeof schema> = {
  name: "",
  email: "",
  phone: "",
  picture: "",
  governingBody: "",
  governingBodyNumber: "",
  streetAddress: "",
  city: "",
  county: "",
  postTown: "",
  postCode: "",
  country: ""
}