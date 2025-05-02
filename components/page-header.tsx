import { MoveLeft, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

const Header = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <header
    className={cn("flex flex-col justify-between space-y-4 pb-8 pt-2 lg:flex-row lg:items-end lg:space-y-0", className)}
    {...props}
  />
);
Header.displayName = "Header";

const HeaderGroup = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-4", className)} {...props} />
);
HeaderGroup.displayName = "HeaderGroup";

const Heading = ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={cn("text-balance text-2xl font-semibold", className)} {...props} />
);
Heading.displayName = "Heading";

const HeaderDescription = ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-balance text-sm text-muted-foreground", className)} {...props} />
);
HeaderDescription.displayName = "HeaderDescription";

const HeaderActions = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex space-x-2 pb-0 lg:pb-2", className)} {...props} />
);
HeaderActions.displayName = "HeaderActions";

type PageHeaderProps = {
  config: {
    metadata: {
      title: string;
    };
    header: string;
    description?: string;
    backLink?: {
      text: string;
      href: string;
    };
    callToAction?: {
      text: string;
      href: string;
    };
  };
};

const PageHeader = ({ config }: PageHeaderProps) => {
  return (
    <Header>
      <HeaderGroup>
        {config.backLink && (
          <Link href={config.backLink.href} className="inline-flex items-center text-sm font-semibold">
            <MoveLeft size={22} className="mr-2" />
            <span>{config.backLink.text}</span>
          </Link>
        )}
        <Heading>{config.header}</Heading>
        {config.description && <HeaderDescription>{config.description}</HeaderDescription>}
        {config.callToAction && (
          <HeaderActions>
            <Button asChild size="sm" variant="secondary">
              <Link href={config.callToAction.href}>
                {config.callToAction.text}
                <SquareArrowOutUpRight className="ml-2" size={16} />
              </Link>
            </Button>
          </HeaderActions>
        )}
      </HeaderGroup>
    </Header>
  );
};
PageHeader.displayName = "PageHeader";

export { PageHeader, Header, HeaderGroup, Heading, HeaderDescription, HeaderActions };
