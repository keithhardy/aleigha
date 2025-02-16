import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { prisma } from '@/lib/prisma';
import { DeleteUserForm } from './form';
import { notFound } from 'next/navigation';

export default async function DeleteUserPage({ params }: { params: Promise<{ id: string }> }) {

  const user = await prisma.user.findFirst({
    where: {
      id: decodeURIComponent((await params).id),
    }
  });

  if (!user) {
    notFound();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Delete User</CardTitle>
        <CardDescription>
          Are you sure you want to delete <span className='text-primary'>{user.name}</span>? This action is permanent and the user will not be recoverable.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DeleteUserForm user={user} />
      </CardContent>
    </Card>
  );
}
