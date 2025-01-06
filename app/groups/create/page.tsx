import { prisma } from "@/lib/prisma";

import CreateGroupForm from "./form";

export default async function Group() {
  const users = await prisma.user.findMany()
  
  return <CreateGroupForm users={users} />;
}
