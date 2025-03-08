import { Header, HeaderGroup, Heading } from "@/components/page-header";

import { ScheduleOfRatesForm } from "./form";

export default function ScheduleOfRates() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Schedule Of Rates</Heading>
        </HeaderGroup>
      </Header>

      <ScheduleOfRatesForm />
    </div>
  );
}
