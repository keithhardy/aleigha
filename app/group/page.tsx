import { prisma } from "@/lib/prisma";

export default async function Groups() {
  const groups = prisma.group.findMany()
  return;
}
