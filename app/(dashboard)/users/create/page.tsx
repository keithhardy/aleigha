import { MoveLeft, SquareArrowOutUpRight } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

import {
  Header,
  HeaderActions,
  HeaderDescription,
  HeaderGroup,
  Heading,
} from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

import CreateUserForm from "./form";

export const metadata: Metadata = {
  title: "Reiyen – Create User",
};

export default async function CreateUser() {
  const clients = await prisma.client.findMany();

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
          <Heading>Create User</Heading>
          <HeaderDescription>Create a user account.</HeaderDescription>
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
      <CreateUserForm clients={clients} />
    </div>
  );
}
