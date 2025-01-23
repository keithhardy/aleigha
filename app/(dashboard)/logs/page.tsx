import { prisma } from "@/lib/prisma";

export default async function Users() {
  const logs = await prisma.log.findMany()

  return (
    <div className="space-y-2">
      {logs.map((log) => (
        <div key={log.id} className="flex flex-col space-y-2">
          <p>{log.message}</p>
        </div>
      ))}
    </div>
  );
};
