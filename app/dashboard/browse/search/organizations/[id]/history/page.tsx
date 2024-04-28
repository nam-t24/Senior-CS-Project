"use client";
import DonorHistory from "./donorHistory";

export default function OrganizationHistory({params}: { params: {id: string} }) {

  const orgID = Number(params.id)

  return (
    <>
      {
        <DonorHistory orgID={orgID}/>
      }
    </>
  );
}
