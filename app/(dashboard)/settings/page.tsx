import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { prisma } from "@/lib/prisma-client";
import { siteConfig } from "@/lib/site-config";

import { UpdateAddressForm } from "./address/form";
import { UpdateEmailForm } from "./email/form";
import { UpdateGoverningBodyForm } from "./governing-body/form";
import { UpdatePictureForm } from "./logo/form";
import { UpdateNameForm } from "./name/form";
import { UpdatePhoneForm } from "./phone/form";

export const metadata: Metadata = {
  title: siteConfig.settings.metadata.title,
};

export default async function Settings() {
  const settings = await prisma.settings.findFirst({
    include: {
      address: true,
    },
  });

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <PageHeader config={siteConfig.settings} />
      <div className="space-y-4">
        <UpdateNameForm settings={settings} />
        <UpdateAddressForm settings={settings} />
        <UpdateEmailForm settings={settings} />
        <UpdatePhoneForm settings={settings} />
        <UpdatePictureForm settings={settings} />
        <UpdateGoverningBodyForm settings={settings} />
      </div>
    </div>
  );
}
