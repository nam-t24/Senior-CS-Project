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
      <main className="2xl:ml-80 ml-64">{children}</main>
    </div>
  );
}