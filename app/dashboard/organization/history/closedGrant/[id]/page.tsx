"use client";
import PageHeading from "@/components/dashboard/PageHeading";
import { useState, useEffect } from "react";
import { getClosedGrantByID } from "@/utils/scripts/grants";
import { formatDate } from "@/utils/helperFunctions";

export default function ClosedGrant({ params }: { params: { id: string } }) {
  const [grantName, setGrantName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [amount, setAmount] = useState<number>(null);
  const [deadline, setDeadline] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [ownerOrg, setOwnerOrg] = useState("");
  const [orgFunded, setOrgFunded] = useState<string>(null);

  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getClosedGrantByID(+params.id);
      if (!data) {
        setNoData(true);
        setLoading(false);
        return;
      }

      setGrantName(data.name);
      setDescription(data.description);
      setRequirements(data.requirements);
      setAmount(data.amount);
      setDeadline(formatDate(data.deadline));
      setDatePosted(formatDate(data.created_at));
      setOwnerOrg(data.ownerOrgName.name);
      if (data.orgFundedName) {
        setOrgFunded(data.orgFundedName.name);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <div className="">
      <PageHeading
        header="Closed Grant Information"
        description="View closed grant information"
      />
      {!loading &&
        (noData ? (
          <div className="mt-24 2xl:text-xl text-lg text-center">
            Grant does not exist or an error occured, check log for error
          </div>
        ) : (
          // Grant doc
          <div className="border-2 border-gray-200 w-[50rem] rounded-lg mx-auto 2xl:mt-16 mt-8 2xl:py-16 py-8 px-16 bg-[#FFFEFE] animate-in shadow">
            <div className="2xl:text-4xl text-3xl font-medium text-center">
              {grantName}
            </div>
            <div className="text-sm text-body 2xl:mt-12 mt-10 mb-1">
              Description:
            </div>
            <div className="2xl:text-base text-sm">{description}</div>

            <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
              Requirements:
            </div>
            <div className="">
              {requirements === "" ? "No requirements" : requirements}
            </div>

            <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
              Grant Amount:
            </div>
            <div className="">${amount}</div>

            <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
              Deadline:
            </div>
            <div className="">{deadline}</div>

            <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
              Date Posted:
            </div>
            <div className="">{datePosted}</div>

            <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
              Owner Organization:
            </div>
            <div className="">{ownerOrg}</div>

            <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
              Organization Funded:
            </div>
            <div className="">{orgFunded || "No organization funded"}</div>
          </div>
        ))}
    </div>
  );
}
