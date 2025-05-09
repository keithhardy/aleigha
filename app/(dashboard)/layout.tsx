import { Header, Sidebar, Wrapper, Footer } from "@/components/dashboard";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <Sidebar />
      <SidebarInset>
        <Header />
        <Wrapper>{children}</Wrapper>
        <Footer />
      </SidebarInset>
    </SidebarProvider>
  );
}
