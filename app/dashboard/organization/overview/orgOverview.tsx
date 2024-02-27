import { useState, useEffect } from "react";
import { getUserOrgData, updateOrg, getUserOrganizationID } from "@/utils/scripts/organization";
import { useToast } from "@/components/ui/use-toast"

interface orgDataType{
    name: any;
    email: any;
    bio: any;
    website: any;
    isNonProfit: any;
}
// Displays if user is part of an organization
export default function OrgOverviewPage() {
    const { toast } = useToast();
    const [orgData, setOrgData] = useState<orgDataType>();

    const [orgName, setOrgName] = useState("");
    const [orgEmail, setOrgEmail] = useState("");
    const [orgBio, setOrgBio] = useState("");
    const [orgWebsite, setOrgWebsite] = useState("");
    const [formError, setFormError] = useState(false);
    const [userOrgID, setUserOrgID] = useState(-1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserOrgData().then(({data}) => setOrgData(data[0])).catch((error) => (displayErrorToast(error)));
        getUserOrganizationID().then(setUserOrgID);
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

    return(
        <div>
            <div className="flex mt-8 2xl:space-x-6 > * + * space-x-4 > * + * animate-in">
                {/* Org Info Section */}
                <div className="w-3/5 2xl:px-10 px-6 2xl:py-8 py-6 bg-lightmaroon/20 rounded-md 2xl:text-lg">
                    <div className="2xl:text-4xl text-3xl 2xl:mb-10 mb-4">Organization Info</div>

                    <div className="text-body mb-1">Organization Name*</div>
                    <input className="bg-transparent border-b border-heading focus:outline-none w-3/5" value={orgName} onChange={e => setOrgName(e.target.value)}/>
                    {formError && orgName==="" && <div className="text-red-800 mt-1 2xl:text-base text-sm">Field required</div>}

                    <div className="text-body mb-1 2xl:mt-10 mt-8">Organization Email*</div>
                    <input className="bg-transparent border-b border-heading focus:outline-none w-3/5" value={orgEmail} onChange={e => setOrgEmail(e.target.value)}/>
                    {formError && orgEmail==="" && <div className="text-red-800 mt-1 2xl:text-base text-sm">Field required</div>}

                    <div className="text-body mb-1 2xl:mt-10 mt-8">Organization Website</div>
                    <input className="bg-transparent border-b border-heading focus:outline-none w-3/5" value={orgWebsite} onChange={e => setOrgWebsite(e.target.value)}/>

                    <div className="text-body mb-1 2xl:mt-10 mt-8">Organization Bio</div>
                    <textarea className="bg-transparent border-b border-heading focus:outline-none w-3/5 min-h-[5rem]" value={orgBio} onChange={e => setOrgBio(e.target.value)}/>
                
                    <div className="text-body mt-6">You are</div>
                    <div>{orgData?.isNonProfit ? "Receiving Funding" : "Giving Funding"}</div>

                    <button className="block px-3 py-1 border-2 border-darkmaroon text-darkmaroon 2xl:text-xl text-lg rounded-xl 2xl:mt-14 mt-6 hover:bg-darkmaroon/20 transition duration-300" onClick={() => handleUpdateOrg()}>{
                        !loading ? "Update Info" : "Updating Info..."}
                    </button>
                </div>
                {/* Team Section */}
                <div>Team info goes here</div>
            </div>
        </div>
    );
}