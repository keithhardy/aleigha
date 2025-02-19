import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";

import { ElectricalInstallationConditionReport } from './form'
import { getCurrentUser } from "@/lib/auth";

export default async function DetailsOfTheContractorClientAndInstallation() {
  const user = await getCurrentUser();

  const users = await prisma.user.findMany()
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
            Fill in the details below to create a new Electrical Installation Condition Report (EICR). Ensure all fields are filled correctly to generate the report.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <ElectricalInstallationConditionReport currentUser={user!} users={users} clients={clients} properties={properties} />
    </>
  )
}
