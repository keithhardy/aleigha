import { DashboardWrapper } from "@/components/dashboard";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
