import { cn } from "@/lib/utils";

function Header({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        "flex flex-col justify-between space-y-4 px-4 py-8 lg:flex-row lg:items-center lg:space-y-0 lg:px-8",
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
      className={cn("text-balance text-3xl font-semibold", className)}
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
  return <div className={cn("flex space-x-2", className)} {...props} />;
}

export { Header, HeaderDescription, HeaderGroup, Heading, HeaderActions };
