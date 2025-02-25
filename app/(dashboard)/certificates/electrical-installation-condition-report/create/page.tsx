import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { getCurrentUser } from "@/lib/auth";

import { CreateElectricalInstallationConditionReportForm } from "./form";

export default async function CreateElectricalInstallationConditionReport() {
  const user = await getCurrentUser();
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
    <>
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
        currentUser={user!}
        clients={clients}
      />
    </>
  );
}
