import { z } from "zod";

export const UpdateLogoSchema = z.object({
  id: z.string().cuid().optional(),
  picture: z
    .instanceof(File)
    .refine((file) => ["image/png", "image/jpeg", "image/jpg", "image/svg+xml", "image/gif"].includes(file.type), {
      message: "Only PNG, JPG, SVG, or GIF images are allowed.",
    }),
});
