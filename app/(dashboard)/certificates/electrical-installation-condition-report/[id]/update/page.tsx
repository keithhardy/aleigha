import { notFound } from "next/navigation";

import { Header, HeaderGroup, Heading } from "@/components/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ScheduleOfCircuitDetailsForm } from "./circuit-details/form";
import { UpdateContractorClientPropertyForm } from "./contractor-client-property/form";
import { DeclarationForm } from "./declaration/form";
import { DetailsAndLimitationsOfTheInspectionAndTestingForm } from "./details-and-limitations/form";
import { ParticularsOfInstallationsReferredToInThisReportForm } from "./installation-details/form";
import { ObservationsForm } from "./observations/form";
import { PurposeOfTheReportForm } from "./purpose-of-the-report/form";
import { ScheduleOfItemsInspectedSection1Form } from "./schedule-of-inspections/section-1/form";
import { ScheduleOfItemsInspectedSection10Form } from "./schedule-of-inspections/section-10/form";
import { ScheduleOfItemsInspectedSection2Form } from "./schedule-of-inspections/section-2/form";
import { ScheduleOfItemsInspectedSection3Form } from "./schedule-of-inspections/section-3/form";
import { ScheduleOfItemsInspectedSection4Form } from "./schedule-of-inspections/section-4/form";
import { ScheduleOfItemsInspectedSection5Form } from "./schedule-of-inspections/section-5/form";
import { ScheduleOfItemsInspectedSection6Form } from "./schedule-of-inspections/section-6/form";
import { ScheduleOfItemsInspectedSection7Form } from "./schedule-of-inspections/section-7/form";
import { ScheduleOfItemsInspectedSection8Form } from "./schedule-of-inspections/section-8/form";
import { ScheduleOfItemsInspectedSection9Form } from "./schedule-of-inspections/section-9/form";
import { SummaryOfTheConditionOfTheInstallationForm } from "./summary-of-the-condition/form";
import { SupplyCharacteristicsAndEarthingArrangementsForm } from "./supply-characteristics/form";
import { ScheduleOfRatesForm } from "./schedule-of-rates/form";

export default async function UpdateElectricalInstallationConditionReport({ params }: { params: Promise<{ id: string }> }) {
  const electricalInstallationConditionReport = await prisma.electricalInstallationConditionReport.findFirst({
    where: {
      id: (await params).id,
    },
    include: {
      client: {
        include: {
          address: true,
        },
      },
      property: {
        include: {
          address: true,
        },
      },
    },
  });

  if (!electricalInstallationConditionReport) {
    notFound();
  }

  const clients = await prisma.client.findMany({
    include: {
      address: true,
      property: {
        include: {
          address: true,
        },
      },
    },
  });

  const settings = await prisma.settings.findFirst({
    include: {
      address: true,
    },
  });

  return (
    <div className="container mx-auto max-w-screen-lg">
      <Tabs defaultValue="page1">
        <TabsList className="w-full grid grid-cols-6">
          <TabsTrigger value="page1">Page 1</TabsTrigger>
          <TabsTrigger value="page2">Page 2</TabsTrigger>
          <TabsTrigger value="page3">Page 3</TabsTrigger>
          <TabsTrigger value="page4">Page 4</TabsTrigger>
          <TabsTrigger value="page5">Page 5</TabsTrigger>
          <TabsTrigger value="page6">Page 6</TabsTrigger>
        </TabsList>
        <TabsContent value="page1" className="space-y-4">
          <UpdateContractorClientPropertyForm electricalInstallationConditionReport={electricalInstallationConditionReport} clients={clients} settings={settings} />
          <PurposeOfTheReportForm />
          <DetailsAndLimitationsOfTheInspectionAndTestingForm />
          <SummaryOfTheConditionOfTheInstallationForm />
          <DeclarationForm />
        </TabsContent>
        <TabsContent value="page2" className="space-y-4">
          <ObservationsForm />
        </TabsContent>
        <TabsContent value="page3" className="space-y-4">
          <SupplyCharacteristicsAndEarthingArrangementsForm />
          <ParticularsOfInstallationsReferredToInThisReportForm />
        </TabsContent>
        <TabsContent value="page4" className="space-y-4">
          <ScheduleOfItemsInspectedSection1Form />
          <ScheduleOfItemsInspectedSection2Form />
          <ScheduleOfItemsInspectedSection3Form />
          <ScheduleOfItemsInspectedSection4Form />
          <ScheduleOfItemsInspectedSection5Form />
          <ScheduleOfItemsInspectedSection6Form />
          <ScheduleOfItemsInspectedSection7Form />
          <ScheduleOfItemsInspectedSection8Form />
          <ScheduleOfItemsInspectedSection9Form />
          <ScheduleOfItemsInspectedSection10Form />
        </TabsContent>
        <TabsContent value="page5" className="space-y-4">
          <ScheduleOfCircuitDetailsForm />
        </TabsContent>
        <TabsContent value="page6" className="space-y-4">
          <ScheduleOfRatesForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
