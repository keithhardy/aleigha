import { LogOut } from "lucide-react";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function Header() {
  return (
    <header className="flex h-12 items-center justify-between border-b px-6">
      <SidebarTrigger className="-ml-1" />
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <a href="/auth/logout">
          <Button variant="ghost" size="icon" className="h-7 w-7">
            <LogOut />
          </Button>
        </a>
      </div>
    </header>
  );
}
