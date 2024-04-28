"use client";
import PageHeading from "@/components/dashboard/PageHeading";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getUserIDandOrgID } from "@/utils/scripts/organization";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { getApplicationsByOrgID } from "@/utils/scripts/applications";
import ApplicationCard from "@/components/dashboard/ApplicationCard";

export default function OrganizationApplications() {
  const router = useRouter();
  const { toast } = useToast();
  const [pendingAppList, setPendingAppList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getApplications = async (orgID: number) => {
      const appData = await getApplicationsByOrgID(orgID);
      if(appData === null) {
        toast({
          variant: "destructive",
          title: "Unable to retrieve applications",
          description: "Reload page or check another time",
        });
        setLoading(false);
        return;
      }
      setPendingAppList(appData);
      setLoading(false);
    }

    const getData = async () => {
      const { orgID } = await getUserIDandOrgID();
      if (orgID === null) {
        router.push("/dashboard/organization/overview/orgSignUp");
      }
      getApplications(orgID);
    };
    getData();
  }, []);

  return (
    <div className="">
      <PageHeading
        header="Applications"
        description="Grants your organization has applied for"
      />
      {loading ? (
        <div className="text-center 2xl:mt-72 mt-52 text-darkmaroon">
          <div className="text-xl font-medium">Retrieving applications</div>
          <div className="loadingAnimation">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          {/* Pending Applications */}
          <section className="animate-in">
            {pendingAppList.length === 0 ? (
              <div className="bg-blue-100 border-t-4 border-blue-500 text-blue-700 px-4 py-3 mt-4 2xl:w-1/3 w-1/2">
                <p className="font-semibold">
                  You currently do not have any pending applications.
                </p>
                <p className="text-sm">Browse open grants below</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl mt-10 border-b-2 border-body pb-2 w-[30rem]">
                  Applications in review
                </h2>
                <div className="flex flex-wrap mt-4 space-around">
                  {pendingAppList.map((app) => {
                    return (
                      <ApplicationCard
                        key={app.id}
                        appID={app.id}
                        name={app.grants.name}
                        amount={app.grants.amount}
                        description={app.grants.description}
                        createdDate={app.created_at}
                      />
                    );
                  })}
                </div>
              </>
            )}
          </section>
          <Link
            href="/dashboard/browse/opengrants"
            className="inline-block text-darkmaroon border-2 border-darkmaroon rounded-md hover:bg-darkmaroon/20 py-1 px-2 mt-8 2xl:text-lg font-medium"
          >
            Browse Open Grants
          </Link>
        </>
      )}
    </div>
  );

}