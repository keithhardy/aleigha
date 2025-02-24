import { Header, HeaderDescription, HeaderGroup, Heading } from "@/components/page-header";
import { prisma } from "@/lib/prisma";

import CreateUserForm from "./form";

export default async function User() {
  const clients = await prisma.client.findMany()

  return (
    <>
      <div className="container mx-auto max-w-screen-md">
        <Header>
          <HeaderGroup>
            <Heading>Create User</Heading>
            <HeaderDescription>
              Complete the form below to add a new user. Make sure all required fields are filled before saving.
            </HeaderDescription>
          </HeaderGroup>
        </Header>

        <CreateUserForm clients={clients} />
      </div>
    </>
  );
};
