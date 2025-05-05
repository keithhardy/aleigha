export async function checkUserEmailExists(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return false;
  }
  return true;
}
