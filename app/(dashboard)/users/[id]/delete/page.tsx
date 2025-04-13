import { MoveLeft, SquareArrowOutUpRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  Header,
  HeaderActions,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

import { DeleteUserForm } from "./form";

export const metadata: Metadata = {
  title: "Reiyen – Delete User",
};

export default async function DeleteUser({
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
    <div className="container mx-auto max-w-screen-xl flex-grow p-6">
      <Header>
        <HeaderGroup>
          <Link
            href={"/users"}
            className="inline-flex items-center text-sm font-semibold"
          >
            <MoveLeft size={22} className="mr-2" />
            <span>Back to Users</span>
          </Link>
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
          <HeaderActions>
            <Button asChild size="sm" variant="secondary">
              <Link href="/documentation">
                Docs
                <SquareArrowOutUpRight />
              </Link>
            </Button>
          </HeaderActions>
        </HeaderGroup>
      </Header>
      {userCount > 1 && <DeleteUserForm user={user} />}
    </div>
  );
}
