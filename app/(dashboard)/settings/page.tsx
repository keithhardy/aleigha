import { Metadata } from "next";

import { PageHeader } from "@/components/page-header";
import { pagesConfig } from "@/config/pages";
import { prisma } from "@/lib/db/prisma-client";

import { UpdateAddressForm } from "./address/form";
import { UpdateEmailForm } from "./email/form";
import { UpdateGoverningBodyForm } from "./governing-body/form";
import { UpdatePictureForm } from "./logo/form";
import { UpdateNameForm } from "./name/form";
import { UpdatePhoneForm } from "./phone/form";

export const metadata: Metadata = {
  title: pagesConfig.settings.metadata.title,
};

export default async function Settings() {
  const settings = await prisma.settings.findFirst({
    include: {
      address: true,
    },
  });

  return (
    <div className="container mx-auto p-6">
      <PageHeader config={pagesConfig.settings} />
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
