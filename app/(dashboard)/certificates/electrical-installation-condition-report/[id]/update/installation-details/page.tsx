import { Header, HeaderGroup, Heading } from "@/components/page-header";

import { ParticularsOfInstallationsReferredToInThisReportForm } from "./form";

export default function ParticularsOfInstallationsReferredToInThisReport() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Particulars Of Installations Referred To In This Report</Heading>
        </HeaderGroup>
      </Header>

      <ParticularsOfInstallationsReferredToInThisReportForm />
    </div>
  );
}
