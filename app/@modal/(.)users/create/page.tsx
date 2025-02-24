import { Modal } from "@/app/@modal/components/modal";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import CreateUserForm from "./form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reiyen – Create User",
};

export default async function UserCreatePage() {
  const clients = await prisma.client.findMany();

  return (
    <Modal>
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Create User</CardTitle>
        </CardHeader>
        <CardContent>
          <CreateUserForm clients={clients} />
        </CardContent>
      </Card>
    </Modal>
  );
}
