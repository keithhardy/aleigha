import { LogOut } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getCurrentUser } from "@/lib/auth";

import { DashboardBreadcrumb } from "./components/breadcrumb";
import { DashboardSidebar } from "./components/dashboard-sidebar";
import { MessageMenu } from "./components/message-menu";
import { NotificationsMenu } from "./components/notifications-menu";



export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();
  if (!user) redirect('/auth/login')

  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true"

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DashboardBreadcrumb />
          </div>
          <div className="flex items-center gap-2 px-4">
            <NotificationsMenu />
            <Separator orientation="vertical" className="h-4" />
            <MessageMenu />
            <Separator orientation="vertical" className="h-4" />
            <ThemeToggle />
            <Separator orientation="vertical" className="h-4" />
            <Link href="/auth/logout">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <LogOut />
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
