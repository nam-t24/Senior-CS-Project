import { useState } from "react";
import { createOrganization } from "@/utils/scripts/organization";

// Displays if user is not part of an organization
export default function OrgSignUpPage() {
    const [orgName, setOrgName] = useState("");
    const [orgEmail, setOrgEmail] = useState("");
    const [orgBio, setOrgBio] = useState("");
    const [formError, setFormError] = useState(false);
    const [orgType, setOrgType] = useState(0); //0 for non-profit, 1 for donor org

    const createOrg = async () => {
        if(orgName == "" || orgEmail == ""){
            setFormError(true);
            return;
        }

        const error = await createOrganization(orgName, orgEmail, orgBio, orgType);

        if(error){
            alert(error.message)
        }

    }

    return(
        <>
        {/* Create org section */}
        <div className="bg-lightmaroon/20 2xl:w-[60rem] w-[50rem] 2xl:mt-14 mt-8 rounded-lg 2xl:px-14 px-10 2xl:py-14 py-8 2xl:text-lg animate-in">
            <h1 className="text-3xl 2xl:mb-14 mb-6">Create an Organization</h1>

            <div className="mb-2">Organization Name*</div>
            <input className="bg-primary px-2 py-1 rounded-md focus:outline-none 2xl:w-1/2 w-3/5 text-base" placeholder="Org Name" onChange={e => setOrgName(e.target.value)}/>
            {formError && orgName=="" && <div className="text-red-800 mt-1 text-base">Field required</div>}

            <div className="mb-2 mt-4">Organization Email*</div>
            <input className="bg-primary px-2 py-1 rounded-md focus:outline-none 2xl:w-1/2 w-3/5 text-base" placeholder="Org Email" type="email" onChange={e => setOrgEmail(e.target.value)}/>
            {formError && orgEmail=="" && <div className="text-red-800 mt-1 text-base">Field required</div>}

            <div className="mt-4">Organization Bio</div>
            <div className="text-body text-sm mb-2">You will be able to edit this later</div>
            <textarea className="bg-primary rounded-md focus:outline-none 2xl:w-1/2 w-3/5 px-2 py-1 min-h-[5rem] text-base" onChange={e => setOrgBio(e.target.value)}/>

            <div className="text-body mb-2 mt-4">You are</div>
            <div className="flex inline-flex space-x-1 > * + * bg-primary p-1 rounded-md">
                <button className={`py-1 px-2 rounded-md ${orgType == 0 ? "bg-neutral-200":"bg-primary"} transition duration-300`} onClick={() => setOrgType(0)}>Seeking Funding</button>
                <button className={`py-1 px-2 rounded-md ${orgType == 1 ? "bg-neutral-200":"bg-primary"} transition duration-300`} onClick={() => setOrgType(1)}>Giving Funding</button>
            </div>
            
            <button className="block px-3 py-1 border-2 border-darkmaroon text-darkmaroon text-xl rounded-xl 2xl:mt-14 mt-8 hover:bg-darkmaroon hover:text-primary transition duration-300" onClick={() => createOrg()}>Create Organization</button>

        </div>

        <h1 className="text-3xl 2xl:mt-24 mt-16 mb-2">Join an Organization</h1>
        <div className="2xl:text-lg text-body">To join an organization, have the organization owner send an invite.<br/>You will be able to accept the invite on this page.</div>
        </>
    );
}