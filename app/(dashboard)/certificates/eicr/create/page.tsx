import { Metadata } from "next";
import { redirect } from "next/navigation";

import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/header";
import { getCurrentUser } from "@/lib/auth";

import { CreateElectricalInstallationConditionReportForm } from "./form";

export const metadata: Metadata = {
  title: "Reiyen – Create EICR",
};

export default async function CreateElectricalInstallationConditionReport() {
  const currentUser = await getCurrentUser();

  if (!currentUser) redirect("/auth/login");

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
