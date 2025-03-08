import { Header, HeaderGroup, Heading } from "@/components/page-header";

import { DeclarationForm } from "./form";

export default function Declaration() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Declaration</Heading>
        </HeaderGroup>
      </Header>

      <DeclarationForm />
    </div>
  );
}
