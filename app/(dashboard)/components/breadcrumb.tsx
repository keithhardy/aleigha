"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const nonLinkableSegments = new Set([
  "electrical-installation-condition-report",
  "update",
]);

const formatLabel = (str: string) => {
  return str.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());
};

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const pathParts = pathname.split("/").filter((part) => part !== "");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {pathParts.length === 0 ? (
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href="/">Dashboard</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {pathParts.length > 0 && <BreadcrumbSeparator />}

        {pathParts.map((part, index) => {
          const href = "/" + pathParts.slice(0, index + 1).join("/");
          const label = formatLabel(part);
          const isLast = index === pathParts.length - 1;
          const isNonLinkable = nonLinkableSegments.has(part);

          return (
            <Fragment key={href}>
              <BreadcrumbItem>
                {isLast || isNonLinkable ? (
                  <BreadcrumbPage
                    className={
                      isNonLinkable && !isLast ? "text-muted-foreground" : ""
                    }
                  >
                    {label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {!isLast && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
