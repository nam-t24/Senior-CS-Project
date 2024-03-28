"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getGrants } from "@/utils/scripts/grants";
import { useToast } from "@/components/ui/use-toast";
import GrantCard from "@/components/dashboard/GrantCard";

// Page to view all grants for an organization
export default function OrganizationGrants() {
  const { toast } = useToast();
  const [grantList, setGrantList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async() => {
      const data = await getGrants();

      if(data === null){
        toast({
          variant: "destructive",
          title: "Unable to retrieve grants",
          description: "Reload page or check another time",
        })
        setLoading(false);
        return;
      }
      setGrantList(data);
      setLoading(false);
    }
    getData();
  }, [])

  return (
    <div className="">
      <PageHeading header="Grants" description="Grants your organization has open for applications"/>
      {loading ? 
      <div className="text-center 2xl:mt-72 mt-52 text-darkmaroon">
        <div className="text-xl font-medium">Retrieving grants</div>
        <div className="loadingAnimation"><div></div><div></div><div></div></div>
      </div> 
      :
      <section className="animate-in">
        {grantList.length === 0 ? 
        <div className="bg-blue-100 border-t-4 border-blue-500 text-blue-700 px-4 py-3 mt-4 2xl:w-1/3 w-1/2">
          <p className="font-semibold">You currently do not have any grants open.</p>
          <p className="text-sm">Create a new grant below</p>
        </div>
        :
        <div className="flex flex-wrap mt-10 space-around">
          {grantList.map((grant)=>{
            return(<GrantCard key={grant.id} grantID={grant.id} name={grant.name} amount={grant.amount} description={grant.description} createdDate={grant.created_at}/>);
          })}
        </div>}

        
        <Link href="/dashboard/organization/grants/createGrant" className="inline-block text-darkmaroon border-2 border-darkmaroon rounded-md hover:bg-darkmaroon/20 py-1 px-2 mt-24 2xl:text-lg font-medium">
          Create New Grant
        </Link>
      </section>}

    </div>
  );
}