export function Wrapper({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className="flex-grow">{children}</main>;
}
