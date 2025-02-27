import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { prisma } from "@/lib/prisma";

import { UpdateSettingsForm } from "./form";

export default async function Settings() {
  const settings = await prisma.settings.findFirst({
    include: {
      address: true,
    },
  });

  return (
    <div className="container mx-auto max-w-screen-lg space-y-4">
      <Header>
        <HeaderGroup>
          <Heading>Account Settings</Heading>
        </HeaderGroup>
      </Header>
      <UpdateSettingsForm settings={settings} />
    </div>
  );
}
