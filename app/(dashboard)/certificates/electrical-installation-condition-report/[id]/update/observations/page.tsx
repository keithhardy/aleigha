import { Header, HeaderGroup, Heading } from "@/components/page-header";

import { ObservationsForm } from "./form";

export default function Observations() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Observations</Heading>
        </HeaderGroup>
      </Header>

      <ObservationsForm />
    </div>
  );
}
