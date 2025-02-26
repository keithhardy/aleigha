import { Metadata } from "next";

import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { prisma } from "@/lib/prisma";

import CreateUserForm from "./form";

export const metadata: Metadata = {
  title: "Reiyen – Create User",
};

export default async function CreateUser() {
  const clients = await prisma.client.findMany();

  return (
    <div className="container mx-auto max-w-screen-lg">
      <Header>
        <HeaderGroup>
          <Heading>Create User</Heading>
          <HeaderDescription>
            Complete the form below to add a new user. Make sure all required
            fields are filled before saving.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <CreateUserForm clients={clients} />
    </div>
  );
}
