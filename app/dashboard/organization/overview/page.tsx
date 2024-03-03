"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import { useState, useEffect } from "react";
import { getUserOrgData, updateOrg, getUserIDandOrgID, isUserOwner, getOrgTeam, removeUserFromOrg } from "@/utils/scripts/organization";
import { useToast } from "@/components/ui/use-toast";
import OrgInvite from "./orgInvite";
import OrgTeam from "./orgTeam";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


type orgDataType = {
    name: string;
    email: string;
    bio: string | null;
    website: string | null;
    isNonProfit: boolean;
    owner: string;
    admins: Array<string>;
}

export default function OrganizationOverview() {
    const router = useRouter();
    const { toast } = useToast();
    const [userID, setUserID] = useState("");
    const [orgData, setOrgData] = useState<orgDataType>(null);

    const [orgName, setOrgName] = useState("");
    const [orgEmail, setOrgEmail] = useState("");
    const [orgBio, setOrgBio] = useState("");
    const [orgWebsite, setOrgWebsite] = useState("");
    const [formError, setFormError] = useState(false);
    const [userOrgID, setUserOrgID] = useState(-1);
    const [loading, setLoading] = useState(true);
    const [isOwner, setIsOwner] = useState(false);
    const [orgTeam, setOrgTeam] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const getAllData = async () => {
            const {userUUID, orgID} = await getUserIDandOrgID();
            setUserID(userUUID)
            setUserOrgID(orgID);

            if(orgID === null){
                router.push("/dashboard/organization/overview/orgSignUp")
            }

            const res = await getUserOrgData(orgID);
            if(res.error){
                displayErrorToast(res.error);
                return;
            }
            setOrgData(res.orgData);
            if(res.orgData.owner === userUUID){
                setIsOwner(true);
            }
            if(res.orgData.admins.includes(userUUID)){
                setIsAdmin(true);
            }
            
            setLoading(false);

            getOrgTeam(orgID, res.orgData.admins).then(setOrgTeam);
        }

        getAllData();
    }, [])

    useEffect(() => {
        setOrgName(orgData?.name || "");
        setOrgEmail(orgData?.email || "");
        setOrgBio(orgData?.bio || "");
        setOrgWebsite(orgData?.website || "");
    }, [orgData])

    const handleUpdateOrg = async () => {
        if(orgName == "" || orgEmail == ""){
            setFormError(true);
            return;
        }
        setLoading(true)
        const error = await updateOrg(orgName, orgEmail, orgBio, orgWebsite, userOrgID);

        if(error){
            displayErrorToast(error);
        }
        else {
            displaySuccessToast()
        }
        setLoading(false);
    }

    const displayErrorToast = (error) => {
        console.log(error.message);
        toast({
            variant: "destructive",
            title: "Unable to update organization",
            description: "Check log for error",
        })
    }

    const displaySuccessToast = () => {
        toast({
            title: "Organization Successfully Updated",
            })
    }

    const leaveOrg = async () => {
        const error = await removeUserFromOrg(userID, userOrgID);

        if (error){
            console.log(error.message);
            toast({
            variant: "destructive",
            title: "Unable to leave organization",
            description: "Check log for error",
            })
        }
        else{
            toast({
            title: "Successfully Left Organization",
            })
            router.push("/dashboard/organization/overview/orgSignUp");
            router.refresh()
        }
    }
    return(
        <div className="">
            <PageHeading header="Overview" description="Your organization"/>
            {loading ? 
            <div className="text-center 2xl:mt-72 mt-52 text-darkmaroon">
                <div className="text-xl font-medium">Getting organization data</div>
                <div className="loadingAnimation"><div></div><div></div><div></div></div>
            </div> 
            :
            <div>
            <div className="flex items-stretch mt-8 2xl:space-x-6 space-x-4 animate-in">
                {/* Org Info Section */}
                <div className="w-3/5 2xl:px-10 px-6 2xl:py-8 py-6 bg-lightmaroon/20 rounded-md 2xl:text-lg border-[1px] border-darkmaroon/50">
                    <div className="2xl:text-4xl text-3xl 2xl:mb-10 mb-4">Organization Info</div>

                    <div className="text-body mb-1">Organization Name*</div>
                    {isOwner || isAdmin ?
                    <input className="bg-transparent border-b border-heading focus:outline-none 2xl:w-1/2 w-3/5" value={orgName} onChange={e => setOrgName(e.target.value)}/>
                    :
                    <div>{orgName}</div>
                    }
                    {formError && orgName==="" && <div className="text-red-800 mt-1 2xl:text-base text-sm">Field required</div>}

                    <div className="text-body mb-1 2xl:mt-10 mt-8">Organization Email*</div>
                    {isOwner || isAdmin ?
                    <input className="bg-transparent border-b border-heading focus:outline-none 2xl:w-1/2 w-3/5" value={orgEmail} onChange={e => setOrgEmail(e.target.value)}/>
                    :
                    <div>{orgEmail}</div>
                    }
                    
                    {formError && orgEmail==="" && <div className="text-red-800 mt-1 2xl:text-base text-sm">Field required</div>}

                    <div className="text-body mb-1 2xl:mt-10 mt-8">Organization Website</div>
                    {isOwner || isAdmin ?
                    <input className="bg-transparent border-b border-heading focus:outline-none 2xl:w-1/2 w-3/5" value={orgWebsite} onChange={e => setOrgWebsite(e.target.value)}/>
                    :
                    <div>{orgWebsite}</div>
                    }

                    <div className="text-body mb-1 2xl:mt-10 mt-8">Organization Bio</div>
                    {isOwner || isAdmin ?
                    <textarea className="bg-transparent border-b border-heading focus:outline-none 2xl:w-1/2 w-3/5 min-h-[5rem]" value={orgBio} onChange={e => setOrgBio(e.target.value)}/>
                    :
                    <div className="w-3/5 min-h-[5rem]">{orgBio}</div>
                    }
                    <div className="text-body mt-6">You are</div>
                    <div>{orgData?.isNonProfit ? "Receiving Funding" : "Giving Funding"}</div>

                    {
                    (isOwner || isAdmin) &&
                    <button className="block px-3 py-1 border-2 border-darkmaroon text-darkmaroon 2xl:text-xl text-lg rounded-lg 2xl:mt-14 mt-6 hover:bg-darkmaroon/20 transition duration-300" onClick={() => handleUpdateOrg()}>{
                        !loading ? "Update Info" : "Updating Info..."}
                    </button>
                    }

                </div>
                {/* Team Section */}
                <div>
                <div className="2xl:text-4xl text-3xl mb-2">Team</div>
                <OrgTeam userUUID= {userID} orgTeam={orgTeam} admins = {orgData === null ? [] : orgData.admins} isOwner={isOwner} orgID = {userOrgID}/>
                </div>
            </div>
            {/* End Org info section */}
            {(isOwner || isAdmin) && <OrgInvite orgID={userOrgID}/>}
            <div className="mt-24">
                <div className="text-2xl">Danger Zone</div>
                <div className="w-96 border-b-[1px] border-body mt-1 mb-5"></div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <button className="bg-red-100 px-2 px-2 rounded-md border-2 border-red-900 text-red-900 text-lg hover:brightness-95">Leave Organization</button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>{(isOwner && orgTeam.length > 1) ? "Unable to leave organization" : "Are you absolutely sure?"}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {(isOwner && orgTeam.length > 1) ? "You must transfer ownership before leaving the organization" : "Click continue to leave organization"}
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        {!(isOwner && orgTeam.length > 1) && <AlertDialogCancel>Cancel</AlertDialogCancel>}
                        {!(isOwner && orgTeam.length > 1) && <AlertDialogAction onClick={() => leaveOrg()}>Continue</AlertDialogAction>}
                        {(isOwner && orgTeam.length > 1) && <AlertDialogCancel>Ok</AlertDialogCancel>}
                    </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
            </div>
            }
        </div>
    );
}