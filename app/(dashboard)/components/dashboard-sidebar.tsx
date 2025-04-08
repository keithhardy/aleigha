"use client";

import {
  LayoutPanelLeft,
  Users,
  Settings2,
  Logs,
  Building2,
  House,
  Folder,
  // BookText,
  // CircleHelp,
  // ScrollText,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

const dashboard = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutPanelLeft,
  },
  {
    title: "Logs",
    url: "/logs",
    icon: Logs,
  },
  {
    title: "Certificates",
    url: "/certificates",
    icon: Folder,
  },
  {
    title: "Properties",
    url: "/properties",
    icon: House,
  },
  {
    title: "Clients",
    url: "/clients",
    icon: Building2,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
];

export function DashboardSidebar() {
  const { setOpenMobile } = useSidebar();

  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Reiyen</span>
                <span className="truncate text-xs">Enterprise</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="scrollbar-hidden">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboard.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={pathname == item.url}
                    onClick={() => setOpenMobile(false)}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {/* <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Help"
              onClick={() => setOpenMobile(false)}
            >
              <Link href="/settings">
                <CircleHelp />
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Documentation"
              onClick={() => setOpenMobile(false)}
            >
              <Link href="/settings">
                <BookText />
                <span>Documentation</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Changelog"
              onClick={() => setOpenMobile(false)}
            >
              <Link href="/settings">
                <ScrollText />
                <span>Changelog</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem> */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Settings"
              onClick={() => setOpenMobile(false)}
            >
              <Link href="/settings">
                <Settings2 />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
