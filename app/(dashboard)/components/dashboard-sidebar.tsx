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
        title: "Details of the contractor, client and installation",
        url: `/certificates/eicr/${certificateId}/update/details-of-the-contractor-client-installation`,
      },
      {
        title: "Purpose of the report",
        url: `/certificates/eicr/${certificateId}/update/purpose-of-the-report`,
      },
      {
        title: "Summary of the condition of the installation",
        url: `/certificates/eicr/${certificateId}/update/summary-of-the-condition-of-the-installation`,
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
        title: "Details and limitations of the inspection and testing",
        url: `/certificates/eicr/${certificateId}/update/details-and-limitations-of-the-inspection-and-testing`,
      },
      {
        title: "Supply characteristics and earthing arrangements",
        url: `/certificates/eicr/${certificateId}/update/supply-characteristics-and-earthing-arrangements`,
      },
      {
        title: "Particulars of installation reffered to in this Report",
        url: `/certificates/eicr/${certificateId}/update/particulars-of-installation-reffered-to-in-this-Report`,
      },
      {
        title: "Intake equipment (visual inspection only)",
        url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/intake-equipment`,
      },
      {
        title: "Presence of adequate arrangements for parallel or switched alternative sources",
        url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/presence-of-adequate-arrangements-for-parallel-or-switched-alternative-sources`,
      },
      {
        title: "Methods of protection",
        url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/methods-of-Protection`,
      },
      {
        title: "Distribution equipment, including consumer units and distribution boards",
        url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/distribution-equipment`,
      },
      {
        title: "Distribution circuits",
        url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/distribution-Circuits`,
      },
      {
        title: "Final circuits",
        url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/final-circuits`,
      },
      {
        title: "Isolation and switching",
        url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/isolation-and-switching`,
      },
      {
        title: "Current-using equipment (permanently connected)",
        url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/current-using-equipment`,
      },
      {
        title: "Special locations and installations",
        url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/special-locations-and-installations`,
      },
      {
        title: "Prosumer’s low voltage installation",
        url: `/certificates/eicr/${certificateId}/update/schedule-of-inspections/prosumers-low-voltage-installation`,
      },
      {
        title: "Schedule of circuit details and test results",
        url: `/certificates/eicr/${certificateId}/update/schedule-of-circuit-details-and-test-results`,
      },
      {
        title: "Schedule of rates",
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
