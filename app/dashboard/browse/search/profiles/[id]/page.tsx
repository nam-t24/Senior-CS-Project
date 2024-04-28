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
          title: "Unable to retrieve profiles",
          description: "Reload page or check another time",
        });
        setErrorFetching(true);
        return;
      }
      setName(profileData.full_name);
      setEmail(profileData.email);
      setBio(profileData.bio);
      setOrgName(profileData.FK_organizations.name);

    }

    fetchData();
  }, []);


  return (
    <div className="">
      <PageHeading header="Search" description="Public profile" />
      {errorFetching ? (
        <div className="mt-8 text-center">
          There was an error retrieving grants. Reload or try again later.
        </div>
      ) : (
        <div className="flex mt-8">
          <div className="w-4/5 2xl:h-[36rem] h-7/8 2xl:px-10 px-6 2xl:py-8 py-6 bg-[url('/assets/backgrounds/section_background.svg')] bg-no-repeat bg-cover bg-center rounded-3xl shadow-inner shadow-xl">
            <div className="2xl:text-5xl text-4xl 2xl:mb-7 mb-2 font-semibold text-darkmaroon">{name}</div>
            <div className="2xl:text-2xl text-2xl 2xl:mb-7 mb-4 ">{email}</div>
            <div className="2xl:w-96 w-80 py-3 2xl:text-lg text-lg 2xl:mb-12 mb-4 ">{bio}</div>
            <div className="2xl:text-2xl text-2xl 2xl:mb-2 mb-2 font-medium">Organization</div>
            <div className="border-b border-body 2xl:w-72 2xl:mb-px mb-px"></div>
            <div className="2xl:w-96 w-80 py-3 2xl:text-lg text-lg 2xl:mb-12 mb-4">{orgName}</div>
          </div>
        </div>
      )}


    </div>

  );
}
