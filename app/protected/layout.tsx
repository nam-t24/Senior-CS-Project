import SideNav from "@/components/SideNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <SideNav />
      <main className="2xl:ml-96 ml-60">{children}</main>
    </div>
  );
}