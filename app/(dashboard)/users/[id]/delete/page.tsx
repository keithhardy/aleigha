import { notFound } from "next/navigation";

import {
  Header,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { prisma } from "@/lib/prisma";

import { DeleteUserForm } from "./form";

export default async function DeleteUserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await prisma.user.findFirst({
    where: {
      id: decodeURIComponent((await params).id),
    },
  });

  if (!user) {
    notFound();
  }

  const userCount = await prisma.user.count();

  return (
    <>
      <Header>
        <HeaderGroup>
          <Heading>Delete User</Heading>
          {userCount === 1 ? (
            <HeaderDescription>
              You cannot delete {user.name} because they are the last user. A
              minimum of one user is required.
            </HeaderDescription>
          ) : (
            <HeaderDescription>
              You are about to delete {user.name}. This action is permanent and
              cannot be undone.
            </HeaderDescription>
          )}
        </HeaderGroup>
      </Header>

      {userCount > 1 && <DeleteUserForm user={user} />}
    </>
  );
}
