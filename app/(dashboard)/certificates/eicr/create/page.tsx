import { Metadata } from "next";

import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/header";
import { auth0 } from "@/lib/auth0-client";

import { CreateElectricalInstallationConditionReportForm } from "./form";

export const metadata: Metadata = {
  title: "Reiyen – Create EICR",
};

export default async function CreateElectricalInstallationConditionReport() {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    return null;
  }

  const currentUser = await prisma.user.findUnique({
    where: { auth0Id: session.user.sub },
  });

  const clients = await prisma.client.findMany({
    include: {
      property: {
        include: {
          address: true,
        },
      },
    },
  });

  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Create Electrical Installation Condition Report</Heading>
          <HeaderDescription>
            Fill in the details below to create a new Electrical Installation
            Condition Report (EICR).
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <CreateElectricalInstallationConditionReportForm
        currentUser={currentUser}
        clients={clients}
      />
    </div>
  );
}
