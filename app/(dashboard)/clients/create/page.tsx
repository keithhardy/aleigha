import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";

import { ClientCreateForm } from '@/app/(dashboard)/clients/create/form';

export default function CreateClientPage() {
  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>Create Client</Heading>
          <HeaderDescription>
            Fill out the form below to add a new client. Ensure all required information is provided before saving.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <ClientCreateForm />
    </>
  );
}
