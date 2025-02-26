import { cn } from '@/lib/utils';

function Header({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <header className={cn('py-4', className)} {...props} />
}

function Heading({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h1 className={cn('text-3xl font-medium', className)} {...props} />;
}

function HeaderDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-balance text-sm font-light text-muted-foreground', className)} {...props} />
}

function HeaderGroup({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <div className={cn('space-y-4', className)} {...props} />;
}

export { Header, HeaderDescription, HeaderGroup, Heading };
