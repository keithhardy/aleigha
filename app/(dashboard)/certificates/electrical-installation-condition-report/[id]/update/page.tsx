import { notFound } from "next/navigation";

import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";

import { ElectricalInstallationConditionReportForm } from './form'

export default async function DetailsOfTheContractorClientAndInstallation({ params }: { params: Promise<{ id: string }> }) {
  const electricalInstallationConditionReport = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id
    },
  })

  if (!electricalInstallationConditionReport) {
    notFound();
  }

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
          <Heading>Update Electrical Installation Condition Report</Heading>
          <HeaderDescription>
            Fill in the details below to update a new Electrical Installation Condition Report (EICR).
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <ElectricalInstallationConditionReportForm electricalInstallationConditionReport={electricalInstallationConditionReport!} clients={clients} properties={properties} />
    </>
  )
}
