import { LogOut } from "lucide-react";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth0 } from "@/lib/auth0-client";

import { DashboardSidebar } from "./components/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await auth0.getSession();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  const currentYear = new Date().getFullYear();

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-6">
            <SidebarTrigger className="-ml-1" />
          </div>
          <div className="flex items-center gap-2 px-6">
            <ThemeToggle />
            <Separator orientation="vertical" className="h-4" />
            <a href="/auth/logout">
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <LogOut />
              </Button>
            </a>
          </div>
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
        <footer className="flex flex-col items-center justify-between gap-2 border-t py-4 lg:flex-row">
          <div className="flex items-center gap-2 px-6 text-sm">
            © {currentYear} Reiyen Group | All Rights Reserved.
          </div>
          <div className="flex items-center gap-2 px-6 text-sm">
            <Link
              href="/terms-of-service"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Terms of Service
            </Link>{" "}
            |{" "}
            <Link
              href="privacy-policy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Privacy Policy
            </Link>{" "}
            |{" "}
            <Link
              href="cookie-policy"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Cookie Policy
            </Link>
          </div>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
