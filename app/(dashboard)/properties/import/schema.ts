import { z } from "zod";

export const ImportPropertiesSchema = z.object({
  client: z.string().cuid({ message: "Please select a client." }),
  file: z.instanceof(File).refine((file) => ["text/csv"].includes(file.type), {
    message: "Only CSV files are allowed.",
  }),
});
