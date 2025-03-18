import { cn } from "@/lib/utils";

function Header({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        "flex flex-col justify-between space-y-4 pb-8 pt-2 lg:flex-row lg:items-end lg:space-y-0",
        className,
      )}
      {...props}
    />
  );
}

function HeaderGroup({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("space-y-4", className)} {...props} />;
}

function Heading({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("text-balance text-2xl font-semibold", className)}
      {...props}
    />
  );
}

function HeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-balance text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function HeaderActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex space-x-2 pb-0 lg:pb-2 justify-end", className)} {...props} />;
}

export { Header, HeaderDescription, HeaderGroup, Heading, HeaderActions };
