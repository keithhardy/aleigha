import { MoveLeft, SquareArrowOutUpRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import {
  Header,
  HeaderActions,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

import { UpdateAddressForm } from "./address/form";
import { UpdateEmailForm } from "./email/form";
import { UpdateGoverningBodyForm } from "./governing-body/form";
import { UpdatePictureForm } from "./logo/form";
import { UpdateNameForm } from "./name/form";
import { UpdatePhoneForm } from "./phone/form";

export const metadata: Metadata = {
  title: "Reiyen – Settings",
};

export default async function Settings() {
  const settings = await prisma.settings.findFirst({
    include: {
      address: true,
    },
  });

  return (
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <Header>
        <HeaderGroup>
          <Link
            href={"/"}
            className="inline-flex items-center text-sm font-semibold"
          >
            <MoveLeft size={22} className="mr-2" />
            <span>Back to Dashboard</span>
          </Link>
          <Heading>Settings</Heading>
          <HeaderDescription>
            Update your organization’s settings. These will be shown on all
            certificates.
          </HeaderDescription>
          <HeaderActions>
            <Button asChild size="sm" variant="secondary">
              <Link href="/documentation">
                Docs
                <SquareArrowOutUpRight />
              </Link>
            </Button>
          </HeaderActions>
        </HeaderGroup>
      </Header>
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
