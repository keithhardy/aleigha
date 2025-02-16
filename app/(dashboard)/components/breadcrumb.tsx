"use client";

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Fragment } from "react";

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const pathParts = pathname.split('/').filter(part => part !== '');

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

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

        {pathParts.map((part, index) => (
          <Fragment key={index}>
            <BreadcrumbItem>
              {index === pathParts.length - 1 ? (
                <BreadcrumbPage>{capitalize(part)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={'/' + pathParts.slice(0, index + 1).join('/')}>
                    {capitalize(part)}
                  </Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < pathParts.length - 1 && <BreadcrumbSeparator />}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
