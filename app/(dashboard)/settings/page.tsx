import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { prisma } from "@/lib/prisma";

import { UpdateAddressForm } from "./address/form";
import { UpdateEmailForm } from "./email/form";
import { UpdateGoverningBodyForm } from "./governing-body/form";
import { UpdatePictureForm } from "./logo/form";
import { UpdateNameForm } from "./name/form";
import { UpdatePhoneForm } from "./phone/form";

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

      <UpdateNameForm settings={settings} />
      <UpdateEmailForm settings={settings} />
      <UpdatePhoneForm settings={settings} />
      <UpdatePictureForm settings={settings} />
      <UpdateGoverningBodyForm settings={settings} />
      <UpdateAddressForm settings={settings} />
    </div>
  );
}
