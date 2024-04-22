import PageHeading from "@/components/dashboard/PageHeading";

export default function ProfilePage({ params }: { params: { id: string } }) {
  return (
    <div className="">
      <PageHeading header="Search" description="Public profile" />
    </div>
  );
}
