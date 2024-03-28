import PageHeading from "@/components/dashboard/PageHeading";

// Page to view all applications for a grant with grantID as ID
export default function ViewApplications({
  params,
}: {
  params: { grantID: string };
}) {
  return (
    <div>
      <PageHeading
        header="View Applications"
        description="View all applications from your grant"
      />
    </div>
  );
}
