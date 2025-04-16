import {
  LayoutPanelLeft,
  Logs,
  Folder,
  House,
  Building2,
  Users,
  CircleHelp,
  BookText,
  ScrollText,
  Settings2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SidebarNavItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

export type DashboardSidebarConfig = {
  mainNav: SidebarNavItem[];
  footerNav: SidebarNavItem[];
};

export const dashboardSidebarConfig: DashboardSidebarConfig = {
  mainNav: [
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
  ],
  footerNav: [
    {
      title: "Help",
      url: "/help",
      icon: CircleHelp,
    },
    {
      title: "Documentation",
      url: "/documentation",
      icon: BookText,
    },
    {
      title: "Changelog",
      url: "/changelog",
      icon: ScrollText,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings2,
    },
  ],
};
