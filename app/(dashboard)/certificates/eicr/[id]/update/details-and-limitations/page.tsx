import { Header, HeaderGroup, Heading } from "@/components/page-header";

import { DetailsAndLimitationsOfTheInspectionAndTestingForm } from "./form";

export default function DetailsAndLimitationsOfTheInspectionAndTesting() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Details And Limitations Of The Inspection And Testing</Heading>
        </HeaderGroup>
      </Header>

      <DetailsAndLimitationsOfTheInspectionAndTestingForm />
    </div>
  );
}
