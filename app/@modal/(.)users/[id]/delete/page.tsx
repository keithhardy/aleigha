import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Modal } from "@/app/@modal/components/modal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

import { DeleteUserForm } from "./form";

export const metadata: Metadata = {
  title: "Reiyen – Delete User",
};

export default async function DeleteUser({ params }: { params: Promise<{ id: string }> }) {
  const user = await prisma.user.findFirst({
    where: {
      id: (await params).id,
    },
  });

  if (!user) {
    notFound();
  }

  return (
    <Modal>
      <Card className="border-none shadow-none">
        <CardHeader className="col-span-2 lg:col-span-1">
          <CardTitle>Delete User</CardTitle>
          <CardDescription>
            Are you sure you want to delete <span className="text-primary">{user.name}</span>? This action is permanent and the user will not be recoverable.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DeleteUserForm user={user} />
        </CardContent>
      </Card>
    </Modal>
  );
}
