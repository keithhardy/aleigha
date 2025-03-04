import { Header, HeaderGroup, Heading } from "@/components/page-header";

import { PurposeOfTheReportForm } from "./form";

export default function PurposeOfTheReport() {
  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Purpose of the report</Heading>
        </HeaderGroup>
      </Header>

      <PurposeOfTheReportForm />
    </div>
  );
}
