import { Header, HeaderGroup, Heading } from "@/components/page-header";

import { ScheduleOfItemsInspectedSection9Form } from "./form";

export default function ScheduleOfItemsInspected() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Schedule Of Items Inspected - Section 9</Heading>
        </HeaderGroup>
      </Header>

      <ScheduleOfItemsInspectedSection9Form />
    </div>
  );
}
