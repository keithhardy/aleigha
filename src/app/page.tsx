import prisma from "@/lib/prisma";
import CreateUserForm from "@/forms/create-user";
import CreateGroupForm from "@/forms/create-group";
import CreateMessageForm from "@/forms/create-message";

export default async function Home() {
  const users = await prisma.user.findMany();

  return <CreateUserForm />
  // return <CreateGroupForm users={users} />
  // return <CreateMessageForm />
}
