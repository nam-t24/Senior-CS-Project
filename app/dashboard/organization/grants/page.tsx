import PageHeading from "@/components/dashboard/PageHeading";
import Link from "next/link";

export default function OrganizationGrants() {
  return (
    <div className="">
      <PageHeading header="Grants" description="Grants your organization has open for applications"/>

      
      <Link href="/dashboard/organization/grants/createGrant" className="inline-block text-darkmaroon border-2 border-darkmaroon rounded-md hover:bg-darkmaroon/20 py-1 px-2 mt-24">
        Create New Grant
      </Link>

    </div>
  );
}