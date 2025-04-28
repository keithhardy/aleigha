import { z } from "zod";

export const UploadPropertiesSchema = z.object({
  csv: z.instanceof(File).refine((file) => ["text/csv"].includes(file.type), {
    message: "Only CSV files are allowed.",
  }),
});
