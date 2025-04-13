import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Modal } from "@/app/@modal/components/modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
      id: (await params).id,
    },
  });

  if (!user) {
    notFound();
  }

  const userCount = await prisma.user.count();

  return (
    <Modal>
      <Card className="border-none shadow-none">
        <CardHeader className="col-span-2 lg:col-span-1">
          <CardTitle>Delete User</CardTitle>
          {userCount === 1 ? (
            <CardDescription>
              You cannot delete {user.name} because they are the last user. A
              minimum of one user is required.
            </CardDescription>
          ) : (
            <CardDescription>
              You are about to delete {user.name}. This action is permanent and
              cannot be undone.
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <DeleteUserForm user={user} />
        </CardContent>
      </Card>
    </Modal>
  );
}
