import { includes } from "lodash";

import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";
import { getCurrentUser } from "@/lib/auth";

import { ElectricalInstallationConditionReportForm } from './form'

export default async function ElectricalInstallationConditionReport() {
  const user = await getCurrentUser();
  const clients = await prisma.client.findMany({
    include: {
      property: {
        include: {
          address: true
        }
      }
    }
  })

  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>Create Electrical Installation Condition Report</Heading>
          <HeaderDescription>
            Fill in the details below to create a new Electrical Installation Condition Report (EICR).
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <ElectricalInstallationConditionReportForm currentUser={user!} clients={clients} />
    </>
  )
}
