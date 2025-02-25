import { CreateClientForm } from "@/app/(dashboard)/clients/create/form";
import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";

export default function CreateClient() {
  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>Create Client</Heading>
          <HeaderDescription>
            Fill out the form below to add a new client. Ensure all required
            information is provided before saving.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <CreateClientForm />
    </>
  );
}
