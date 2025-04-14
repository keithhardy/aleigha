import { MoveLeft, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

import {
  Header,
  HeaderDescription,
  HeaderGroup,
  HeaderActions,
  Heading,
} from "@/components/header";
import { Button } from "@/components/ui/button";

interface PageDetails {
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
}

interface PageHeaderProps {
  config: PageDetails;
}

export function PageHeader({ config }: PageHeaderProps) {
  return (
    <Header>
      <HeaderGroup>
        {config.backLink && (
          <Link
            href={config.backLink.href}
            className="inline-flex items-center text-sm font-semibold"
          >
            <MoveLeft size={22} className="mr-2" />
            <span>{config.backLink.text}</span>
          </Link>
        )}
        <Heading>{config.header}</Heading>
        {config.description && (
          <HeaderDescription>{config.description}</HeaderDescription>
        )}
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
}
