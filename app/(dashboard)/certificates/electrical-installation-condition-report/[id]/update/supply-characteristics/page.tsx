import { Header, HeaderGroup, Heading } from "@/components/page-header";

import { SupplyCharacteristicsAndEarthingArrangementsForm } from "./form";

export default function SupplyCharacteristicsAndEarthingArrangements() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Supply Characteristics And Earthing Arrangements</Heading>
        </HeaderGroup>
      </Header>

      <SupplyCharacteristicsAndEarthingArrangementsForm />
    </div>
  );
}
