import {
  HeaderDescription,
  HeaderGroup,
  Header,
  Heading,
} from "@/components/page-header";
import { prisma } from "@/lib/prisma";

import { SettingsForm } from "./form";

export default async function Settings() {
  const settings = await prisma.settings.findFirst({
    include: {
      address: true,
    },
  });

  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>Settings</Heading>
          <HeaderDescription>
            These are the settings that will be displayed on all your
            certificates.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <SettingsForm settings={settings} />
    </>
  );
}
