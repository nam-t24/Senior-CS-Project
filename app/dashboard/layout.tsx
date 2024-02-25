import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import SideNav from "@/components/dashboard/SideNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="w-full">
      <SideNav />
      <main className="min-h-screen 2xl:ml-80 ml-64 2xl:px-44 px-14 2xl:py-16 py-10">{children}</main>
    </div>
  );
}