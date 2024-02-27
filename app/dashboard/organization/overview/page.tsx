"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import { getUserOrganizationID } from "@/utils/scripts/organization";
import OrgOverviewPage from "./orgOverview";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function OrganizationOverview() {
    const router = useRouter();
    const [userOrg, setuserOrg] = useState<any>(-1);

    useEffect(() => {
        getUserOrganizationID().then(setuserOrg);
    },[]);

    useEffect(() => {
        if(userOrg !== -1 && userOrg== null){
            router.push("/dashboard/organization/overview/orgSignUp");
        }
    },[userOrg]);

    return(
        <div className="">
            <PageHeading header="Overview" description="Your organization"/>
            
            {/* Redirects user to correct org page(sign up or overview) */}
            {
                userOrg === -1 ? 
                <div className="text-center 2xl:mt-72 mt-52 text-darkmaroon">
                    <div className="text-xl font-medium">Getting organization data</div>
                    <div className="loadingAnimation"><div></div><div></div><div></div></div>
                </div> 
                : (userOrg == null ?  <div></div> : <OrgOverviewPage/>)
            }
        </div>
    );
}