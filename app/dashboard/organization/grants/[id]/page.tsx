import PageHeading from "@/components/dashboard/PageHeading";

export default function GrantInfo({ params }: { params: { id: string } }) {
    console.log(params.id)
    return (
        <div className="">
            <PageHeading header="Grant Information" description="View grant information"/>
            <div>{params.id}</div>
        </div>
    );
}