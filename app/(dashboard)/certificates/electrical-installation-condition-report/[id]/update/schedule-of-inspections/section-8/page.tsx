import { Header, HeaderGroup, Heading } from "@/components/page-header";

import { ScheduleOfItemsInspectedSection8Form } from "./form";

export default function ScheduleOfItemsInspected() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Schedule Of Items Inspected - Section 8</Heading>
        </HeaderGroup>
      </Header>

      <ScheduleOfItemsInspectedSection8Form />
    </div>
  );
}
