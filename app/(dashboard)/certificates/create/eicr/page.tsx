import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";
import { getCurrentUser } from "@/lib/auth";

import { ElectricalInstallationConditionReport } from './form'

export default async function DetailsOfTheContractorClientAndInstallation() {
  const user = await getCurrentUser();
  const clients = await prisma.client.findMany()
  const properties = await prisma.property.findMany({
    include: {
      address: true
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

      <ElectricalInstallationConditionReport currentUser={user!} clients={clients} properties={properties} />
    </>
  )
}
