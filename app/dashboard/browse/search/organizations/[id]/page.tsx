"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import { useToast } from "@/components/ui/use-toast";
import { getSingleOrg } from "@/utils/scripts/search";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function OrganizationPage({ params }: { params: { id: number } }) {

  const { toast } = useToast;

  const [errorFetching, setErrorFetching] = useState(false);
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [orgName, setOrgName] = useState('');
  const [website, setWebsite] = useState('');
  const [orgType, setOrgType] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      const orgData = await getSingleOrg(params.id);
      if (orgData === null) {
        toast({
          variant: "destructive",
          title: "Unable to retrieve profiles",
          description: "Reload page or check another time",
        });
        setErrorFetching(true);
        return;
      }
      setOrgName(orgData.name);
      setEmail(orgData.email);
      setBio(orgData.bio);
      setWebsite(orgData.website);
      setOrgType(orgData.isNonProfit);

    }

    fetchData();
  }, []);

  // function historyButton(id: number) {
  //   return (
  //     <Link
  //       href={`/dashboard/browse/search/organizations/${id}/history`}
  //       className="border-2 border-neutral-400 bg-[#FFFEFE] 2xl:w-72 w-64 py-3 2xl:px-5 px-4 2xl:mr-5 mr-4 2xl:mb-4 mb-3 rounded-lg group hover:text-darkmaroon hover:border-darkmaroon transition duration-500"
  //     >
  //       <div className="font-semibold truncate">{name}</div>
  //       <div className="text-sm text-body truncate group-hover:text-darkmaroon transition duration-500">
  //         {email}
  //       </div>
  //     </Link>
  //   );
  // }

  return (
    <div className="">
      <PageHeading header="Search" description="Organization profile" />
      {errorFetching ? (
        <div className="mt-8 text-center">
          There was an error retrieving grants. Reload or try again later.
        </div>
      ) : (
        <div className="flex mt-8">
          <div className="w-4/5 2xl:h-[36rem] h-7/8 2xl:px-10 px-6 2xl:py-8 py-6 bg-[url('/assets/backgrounds/section_background.svg')] bg-no-repeat bg-cover bg-center rounded-3xl shadow-inner shadow-xl">
            <div className="2xl:text-5xl text-4xl 2xl:mb-4 mb-2 font-semibold text-darkmaroon">{orgName}</div>
            <div className="2xl:text-2xl text-2xl 2xl:mb-2 mb-2 ">{email}</div>
            <div className="2xl:text-xl text-2xl 2xl:mb-10 mb-6 text-gray-500 opacity-60">{website}</div>
            <div className="2xl:w-96 w-80 py-3 2xl:text-lg text-lg 2xl:mb-12 mb-4 ">{bio}</div>
            <div className="2xl:text-xl text-xl 2xl:mb-2 mb-2 font-medium">Org Type</div>
            <div className="border-b border-body 2xl:w-72 2xl:mb-px mb-px"></div>
            <div className="2xl:w-96 w-80 py-3 2xl:text-md text-md 2xl:mb-12 mb-4">{orgType ? ('Seeking Funding') : ('Giving Funding')}</div>
            <div>
              <Link
                href={`/dashboard/browse/search/organizations/${params.id}/history`}
                className="bg-[#944E63] 2xl:w-48 w-32 py-3 2xl:px-6 px-4 2xl:mb-4 mb-3 rounded-lg group hover:text-darkmaroon hover:border-darkmaroon transition duration-500 text-white"
              >View History
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
