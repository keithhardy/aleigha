import {
  DashboardHeader,
  DashboardSidebar,
  DashboardFooter,
} from "@/components/dashboard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export function DashboardWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <DashboardSidebar />
      <SidebarInset>
        <DashboardHeader />
        {children}
        <DashboardFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
