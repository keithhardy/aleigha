import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";

import { ElectricalInstallationConditionReport } from './form'

export default async function DetailsOfTheContractorClientAndInstallation() {
  const clients = await prisma.client.findMany({
    include: {
      address: true
    }
  })

  const properties = await prisma.property.findMany({
    include: {
      address: true
    }
  })

  const settings = await prisma.settings.findFirst({
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

      <ElectricalInstallationConditionReport clients={clients} properties={properties} contractor={settings} />
    </>
  )
}
