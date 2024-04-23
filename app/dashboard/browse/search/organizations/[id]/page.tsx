import PageHeading from "@/components/dashboard/PageHeading";

export default function OrganizationPage({ params }: { params: { id: string } }) {
  return (
    <div className="">
      <PageHeading header="Search" description="Organization profile" />
    </div>
  );
}
