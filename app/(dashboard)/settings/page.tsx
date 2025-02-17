import { prisma } from "@/lib/prisma";
import { SettingsForm } from "./form";

export default async function Settings() {
  const settings = await prisma.settings.findFirst({
    include: {
      address: true,
    },
  });

  return <SettingsForm settings={settings} />;
};
