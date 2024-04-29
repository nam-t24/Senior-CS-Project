"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import { useToast } from "@/components/ui/use-toast";
import { getSingleProfile } from "@/utils/scripts/search";
import { useEffect, useState } from "react";

export default function ProfilePage({ params }: { params: { id: string } }) {

  const { toast } = useToast();

  const [errorFetching, setErrorFetching] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [orgName, setOrgName] = useState('');


  useEffect(() => {
    const fetchData = async () => {
      const profileData = await getSingleProfile(params.id);
      if (profileData === null) {
        toast({
          variant: "destructive",
          title: "Unable to retrieve profile",
          description: "Reload page or check another time",
        });
        setErrorFetching(true);
        return;
      }
      setName(profileData.full_name);
      setEmail(profileData.email);
      setBio(profileData.bio);
      if (profileData.FK_organizations === null) {
        setOrgName('This user is currently not in any organization');
      } else { setOrgName(profileData.FK_organizations.name); }
    }

    fetchData();
  }, []);


  return (
    <div className="">
      <PageHeading header="Search" description="Public profile" />
      {errorFetching ? (
        <div className="mt-8 text-center">
          There was an error retrieving profile. Reload or try again later.
        </div>
      ) : (
        <div className="mt-8 2xl:max-h-[700px]">
          <div className="2xl:w-[920px] w-[760px] 2xl:min-w-[920px] min-w-[760px] 2xl:h-[575px] 2xl:min-h-[575px] h-[510px] 2xl:px-12 px-10 2xl:py-8 py-6 mb-4 bg-[url('/assets/backgrounds/section_background.svg')] bg-no-repeat bg-cover bg-bottom rounded-3xl shadow-inner shadow-xl">
            <div className="2xl:text-4xl text-3xl 2xl:mb-2 mb-2 font-semibold text-darkmaroon">{name}</div>
            <div className="2xl:text-2xl text-xl 2xl:mb-10 mb-8">{email}</div>
            <div className="2xl:w-[30rem] w-[30rem] 2xl:text-base text-sm 2xl:mb-20 mb-10 2xl:h-[130px] h-[120px]">{bio}</div>
            <div className="2xl:text-xl text-base 2xl:mb-2 mb-2 font-medium 2xl:w-72 w-64 border-b border-body border-black pb-2">Organization</div>
            <div className="2xl:w-96 w-80 2xl:text-base text-sm 2xl:mb-18 mb-14">{orgName}</div>
          </div>
        </div>
      )}


    </div>

  );
}
