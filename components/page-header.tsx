import { cn } from '@/lib/utils';

function Header({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <header className={cn('px-4 lg:px-4 py-8 space-y-4 lg:space-y-0 flex flex-col lg:items-center justify-between lg:flex-row', className)} {...props} />
}

function HeaderGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-y-4', className)} {...props} />;
}

function Heading({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn('text-balance text-3xl font-semibold', className)} {...props} />;
}

function HeaderDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-balance text-sm text-muted-foreground', className)} {...props} />
}

function HeaderActions({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('space-x-2 flex', className)} {...props} />;
}

export { Header, HeaderDescription, HeaderGroup, Heading, HeaderActions };
