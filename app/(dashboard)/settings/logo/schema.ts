import { z } from "zod";

export const UpdateLogoSchema = z.object({
  id: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.string().cuid().optional()
  ),
  picture: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z
      .string()
      .optional()
      .refine((value) => {
        if (value && typeof value === "string") {
          const [metadata, base64String] = value.split(",");
          if (!metadata.startsWith("data:image/")) return false;
          const buffer = Buffer.from(base64String, "base64");
          return buffer.length <= 1 * 1024 * 1024;
        }
        return true;
      }, "File must be an image and less than 1 MB.")
  ),
});
