import {
  HeaderDescription,
  HeaderGroup,
  Header,
  Heading,
} from "@/components/page-header";
import { prisma } from "@/lib/prisma";

import { UpdateSettingsForm } from "./form";

export default async function Settings() {
  const settings = await prisma.settings.findFirst({
    include: {
      address: true,
    },
  });

  return (
    <>
      <div className="container mx-auto max-w-screen-md">
        <Header>
          <HeaderGroup>
            <Heading>Settings</Heading>
            <HeaderDescription>
              These are the settings that will be displayed on all your
              certificates.
            </HeaderDescription>
          </HeaderGroup>
        </Header>

        <UpdateSettingsForm settings={settings} />
      </div>
    </>
  );
}
