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

import UpdateUserForm from "./form";

export const metadata: Metadata = {
  title: "Reiyen – Update User",
};

export default async function UpdateUser({
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
          <Heading>Update User</Heading>
          <HeaderDescription>View and update user.</HeaderDescription>
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
      <UpdateUserForm user={user} clients={clients} />
    </div>
  );
}
