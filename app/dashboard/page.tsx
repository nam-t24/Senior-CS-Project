"use client"
import { useEffect, useState } from "react";
import PageHeading from "@/components/dashboard/PageHeading";
import { getProfileByUserId, updateProfile } from "@/utils/scripts/profiles";
import { useToast } from "@/components/ui/use-toast";
// Profile page, default dashboard page
export default function DashboardProfile() {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [org, setOrg] = useState("");
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const handleUpdateProfile = async () => {
    setUpdating(true);
    const error = await updateProfile(name, email, bio);
    setUpdating(false);
    if (error) {
      displayErrorToast(error);
    }
    else {
      displaySuccessToast()
    }
  }

  const displayErrorToast = (error) => {
    toast({
      variant: "destructive",
      title: "Unable to update profile",
      description: "Check log for error",
    })
  }

  const displaySuccessToast = () => {
    toast({
      title: "Profile Successfully Updated",
    })
  }

  useEffect(() => {
    getProfileByUserId().then((res) => {
      setName(res?.full_name || "");
      setEmail(res?.email || "");
      setBio(res?.bio || "");
      setOrg(res?.organizations?.name || "You are not a part of an organization. Go to \"Organization Overview\" to create or join an organization.");
      setLoading(false);
    }).catch((error) => (displayErrorToast(error)));
  }, [])

  return (
    <div className="flex flex-col 2xl:gap-y-12 gap-y-10">
      <PageHeading header="Profile" description="This is how others will see you on the site" />
      {loading ?
        <div className="text-center 2xl:mt-72 mt-52 text-darkmaroon">
          <div className="text-xl font-medium">Getting Profile data</div>
          <div className="loadingAnimation"><div></div><div></div><div></div></div>
        </div>
        :
        <div className="flex flex-col 2xl:gap-y-12 2xl:w-[45rem] gap-y-8 w-[30rem] animate-in">
          {/* Name */}
          <div className="h-20 text-wrap">
            <div className="2xl:text-3xl text-xl 2xl:font-medium 2xl:mb-4 mb-2">
              Name*
            </div>
            <input type="text" minLength={4} value={name} onChange={(e) => { setName(e.target.value) }} className="outline-none w-full bg-inherit 2xl:text-lg py-1 text-body border-b border-body" />
            {name.length == 0 && <p className="text-red-800 mt-1 2xl:text-base text-sm">Name cannot be empty</p>}
          </div>
          {/* Bio */}
          <div className="text-wrap">
            <div className="2xl:text-3xl text-xl 2xl:font-medium 2xl:mb-4 mb-2">
              Bio
            </div>
            <textarea required={true} value={bio} rows={4} onChange={(e) => { setBio(e.target.value) }} className="outline-none w-full bg-inherit 2xl:text-lg py-1 text-body resize-none border-b border-body" />
          </div>
          {/* Email */}
          <div className="text-wrap">
            <div className="2xl:text-3xl text-xl 2xl:font-medium 2xl:mb-4 mb-2">
              Display Email
            </div>
            <div className="outline-none w-full bg-inherit 2xl:text-lg" >
              {email}
            </div>
          </div>
          {/* Organization */}
          <div className=" text-wrap">
            <div className="2xl:text-3xl text-xl 2xl:font-medium 2xl:mb-4 mb-2">
              Organization
            </div>
            <div className="2xl:text-lg ">
              {org}
            </div>
          </div>
          {/* Update Profile */}
          <div className="flex">
            <button disabled={name.length == 0} onClick={() => handleUpdateProfile()} className="disabled:cursor-not-allowed w-auto bg-brown rounded-lg hover:bg-maroon text-primary 2xl:text-2xl text-xl py-2 px-4 mt-10">{!updating ? "Update Profile" : "Updating Profile..."}</button>
          </div>
        </div>
      }
    </div>
  );
}
