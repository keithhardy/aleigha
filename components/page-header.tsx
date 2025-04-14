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
import { PageDetails } from "@/lib/types/page-details";

interface PageHeaderProps {
  siteConfig: PageDetails;
}

export function PageHeader({ siteConfig }: PageHeaderProps) {
  return (
    <Header>
      <HeaderGroup>
        {siteConfig.backLink && (
          <Link
            href={siteConfig.backLink.href}
            className="inline-flex items-center text-sm font-semibold"
          >
            <MoveLeft size={22} className="mr-2" />
            <span>{siteConfig.backLink.text}</span>
          </Link>
        )}
        <Heading>{siteConfig.header}</Heading>
        {siteConfig.description && (
          <HeaderDescription>{siteConfig.description}</HeaderDescription>
        )}
        {siteConfig.callToAction && (
          <HeaderActions>
            <Button asChild size="sm" variant="secondary">
              <Link href={siteConfig.callToAction.href}>
                {siteConfig.callToAction.text}
                <SquareArrowOutUpRight className="ml-2" size={16} />
              </Link>
            </Button>
          </HeaderActions>
        )}
      </HeaderGroup>
    </Header>
  );
}
