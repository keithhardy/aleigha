import { notFound } from "next/navigation";

import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { prisma } from "@/lib/prisma";

import UpdateUserForm from "./form";

export default async function User({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await prisma.user.findFirst({
    where: {
      id: decodeURIComponent((await params).id),
    },
    include: {
      clients: true,
    },
  });
  const clients = await prisma.client.findMany();

  if (!user) {
    notFound();
  }

  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>User</Heading>
          <HeaderDescription>
            View and edit the user's details. Update any information as needed
            and save your changes.
          </HeaderDescription>
        </HeaderGroup>
      </Header>

      <UpdateUserForm user={user} clients={clients} />
    </>
  );
}
