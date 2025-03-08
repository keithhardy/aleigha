"use client";

import { LayoutPanelLeft, Users, Settings2, Logs, Building2, House, Folder, LinkIcon, ChevronRight, TableOfContents } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "@/components/logo";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarRail, useSidebar } from "@/components/ui/sidebar";

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
  const { setOpen, open } = useSidebar();

  const pathname = usePathname();

  const isEICRUpdate = pathname.startsWith("/certificates/eicr/") && pathname.includes("/update");

  const match = pathname.match(/\/certificates\/eicr\/([^/]+)\/update/);
  const certificateId = match ? match[1] : null;

  const updateEICR = certificateId
    ? [
        {
          title: "Contractor, Client and Property",
          url: `/certificates/eicr/${certificateId}/update/contractor-client-property`,
        },
        {
          title: "Purpose of the Report",
          url: `/certificates/eicr/${certificateId}/update/purpose-of-the-report`,
        },
        {
          title: "Details & Limitations",
          url: `/certificates/eicr/${certificateId}/update/details-and-limitations`,
        },
        {
          title: "Summary",
          url: `/certificates/eicr/${certificateId}/update/summary-of-the-condition`,
        },
        {
          title: "Declaration",
          url: `/certificates/eicr/${certificateId}/update/declaration`,
        },
        {
          title: "Observations",
          url: `/certificates/eicr/${certificateId}/update/observations`,
        },
        {
          title: "Characteristics & Earthing",
          url: `/certificates/eicr/${certificateId}/update/supply-characteristics`,
        },
        {
          title: "Particulars of Installation",
          url: `/certificates/eicr/${certificateId}/update/installation-details`,
        },
        {
          title: "Intake Equipment",
          url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/section-1`,
        },
        {
          title: "Alternative sources",
          url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/section-2`,
        },
        {
          title: "Methods of Protection",
          url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/section-3`,
        },
        {
          title: "Distribution Equipment",
          url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/section-4`,
        },
        {
          title: "Distribution Circuits",
          url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/section-5`,
        },
        {
          title: "Final Circuits",
          url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/section-6`,
        },
        {
          title: "Isolation and Switching",
          url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/section-7`,
        },
        {
          title: "Current-Using Equipment",
          url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/section-8`,
        },
        {
          title: "Special Locations",
          url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/section-9`,
        },
        {
          title: "Prosumer's Low Voltage Installation",
          url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/section-10`,
        },
        {
          title: "Schedule of Circuit Details",
          url: `/certificates/eicr/${certificateId}/update/circuit-details`,
        },
        {
          title: "Schedule of Rates",
          url: `/certificates/eicr/${certificateId}/update/schedule-of-rates`,
        },
      ]
    : [];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
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

      <SidebarContent className=" scrollbar-hidden">
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboard.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title} isActive={pathname == item.url}>
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

        {isEICRUpdate && (
          <SidebarGroup>
            <SidebarGroupLabel>Form</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <Collapsible defaultOpen className="group/collapsible">
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton
                      onClick={(event) => {
                        if (!open) {
                          event.preventDefault();
                        }
                        setOpen(true);
                      }}
                      tooltip="Sections"
                    >
                      <TableOfContents />
                      <span>Sections</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>

                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {updateEICR.map((item) => (
                        <SidebarMenuSubItem key={item.title}>
                          <SidebarMenuSubButton asChild isActive={pathname == item.url}>
                            <Link href={item.url}>
                              <span>{item.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Settings">
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
