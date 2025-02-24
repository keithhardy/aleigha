import { Modal } from '@/app/@modal/components/modal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import CreateUserForm from './form';

export default async function UserCreatePage() {
  const clients = await prisma.client.findMany()

  return (
    <Modal>
      <Card className="border-none shadow-none">
        <CardHeader>
          <CardTitle>Create User</CardTitle>
          <CardDescription>
            Please complete all fields with accurate information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateUserForm clients={clients} />
        </CardContent>
      </Card>
    </Modal>
  );
}
