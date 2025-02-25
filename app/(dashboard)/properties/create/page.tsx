import { CreatePropertyForm } from "@/app/(dashboard)/properties/create/form";
import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";

export default async function CreateProperty() {
  const clients = await prisma.client.findMany();

  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>Create Property</Heading>
          <HeaderDescription>
            Fill out the form below to add a new property. Ensure all required
            information is provided before saving.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <CreatePropertyForm clients={clients} />
    </>
  );
}
