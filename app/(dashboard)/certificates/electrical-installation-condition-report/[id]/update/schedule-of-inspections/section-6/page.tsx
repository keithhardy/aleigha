import { Header, HeaderGroup, Heading } from "@/components/page-header";

import { ScheduleOfItemsInspectedSection6Form } from "./form";

export default function ScheduleOfItemsInspected() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Schedule Of Items Inspected - Section 6</Heading>
        </HeaderGroup>
      </Header>

      <ScheduleOfItemsInspectedSection6Form />
    </div>
  );
}
