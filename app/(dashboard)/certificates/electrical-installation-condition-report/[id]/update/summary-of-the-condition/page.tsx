import { Header, HeaderGroup, Heading } from "@/components/page-header";

import { SummaryOfTheConditionOfTheInstallationForm } from "./form";

export default function SummaryOfTheConditionOfTheInstallation() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Summary of the Condition of the Installation</Heading>
        </HeaderGroup>
      </Header>

      <SummaryOfTheConditionOfTheInstallationForm />
    </div>
  );
}
