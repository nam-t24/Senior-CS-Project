"use client";
import PageHeading from "@/components/dashboard/PageHeading";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getGrantsByOrgID, getGrantsInReviewByOrgID } from "@/utils/scripts/grants";
import { getUserIDandOrgID } from "@/utils/scripts/organization";
import { useToast } from "@/components/ui/use-toast";
import GrantCard from "@/components/dashboard/GrantCard";
import ReviewGrantCard from "@/components/dashboard/ReviewGrantCard";
import { useRouter } from "next/navigation";

// Page to view all grants for an organization
export default function OrganizationGrants() {
  const router = useRouter();
  const { toast } = useToast();
  const [grantList, setGrantList] = useState([]);
  const [grantsInReview, setGrantsInReview] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGrants = async (orgID: number) => {
      const data = await getGrantsByOrgID(orgID);

      if (data === null) {
        toast({
          variant: "destructive",
          title: "Unable to retrieve grants",
          description: "Reload page or check another time",
        });
        setLoading(false);
        return;
      }
      setGrantList(data);
      setLoading(false);
    };

    const getGrantsInReview = async (orgID: number) => {
      const data = await getGrantsInReviewByOrgID(orgID);

      if (data === null) {
        toast({
          variant: "destructive",
          title: "Unable to retrieve grants in review",
          description: "Reload page or check another time",
        });
        return;
      }
      setGrantsInReview(data);
    };

    const getData = async () => {
      const { orgID } = await getUserIDandOrgID();
      if (orgID === null) {
        router.push("/dashboard/organization/overview/orgSignUp");
      }
      getGrants(orgID);
      getGrantsInReview(orgID);
    };
    getData();
  }, []);

  return (
    <div className="">
      <PageHeading
        header="Grants"
        description="Grants your organization has open for applications or to be reviewed"
      />
      {loading ? (
        <div className="text-center 2xl:mt-72 mt-52 text-darkmaroon">
          <div className="text-xl font-medium">Retrieving grants</div>
          <div className="loadingAnimation">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          {/* Open Grants */}
          <section className="animate-in">
            {grantList.length === 0 ? (
              <div className="bg-blue-100 border-t-4 border-blue-500 text-blue-700 px-4 py-3 mt-4 2xl:w-1/3 w-1/2">
                <p className="font-semibold">
                  You currently do not have any grants open.
                </p>
                <p className="text-sm">Create a new grant below</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl mt-10 border-b-2 border-body pb-2 w-[30rem]">
                  Grants currently open
                </h2>
                <div className="flex flex-wrap mt-4 space-around">
                  {grantList.map((grant) => {
                    return (
                      <GrantCard
                        key={grant.id}
                        grantID={grant.id}
                        name={grant.name}
                        amount={grant.amount}
                        description={grant.description}
                        createdDate={grant.created_at}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </section>
          {/* Closed grants but in review */}
          {grantsInReview.length > 0 && (
            <section>
              <h2 className="text-xl mt-16 border-b-2 border-body pb-2 w-[30rem]">
                Grants to be reviewed
              </h2>
              <div className="flex flex-wrap mt-4 space-around">
                {grantsInReview.map((grant) => {
                  return (
                    <ReviewGrantCard
                      key={grant.id}
                      grantID={grant.id}
                      name={grant.name}
                      amount={grant.amount}
                      description={grant.description}
                      createdDate={grant.created_at}
                    />
                  );
                })}
              </div>
            </section>
          )}
          <Link
            href="/dashboard/organization/grants/createGrant"
            className="inline-block text-darkmaroon border-2 border-darkmaroon rounded-md hover:bg-darkmaroon/20 py-1 px-2 mt-8 2xl:text-lg font-medium"
          >
            Create New Grant
          </Link>
        </>
      )}
    </div>
  );
}
