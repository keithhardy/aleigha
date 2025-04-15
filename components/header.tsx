import { cn } from "@/lib/utils";

const Header = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) => (
  <header
    className={cn(
      "flex flex-col justify-between space-y-4 pb-8 pt-2 lg:flex-row lg:items-end lg:space-y-0",
      className,
    )}
    {...props}
  />
);

const HeaderGroup = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("space-y-4", className)} {...props} />
);

const Heading = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h1 className={cn("text-balance text-2xl font-semibold", className)} {...props} />
);

const HeaderDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-balance text-sm text-muted-foreground", className)}
    {...props}
  />
);

const HeaderActions = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex space-x-2 pb-0 lg:pb-2", className)} {...props} />
);

export { Header, HeaderDescription, HeaderGroup, Heading, HeaderActions };
