"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import { getUserOrganizationID } from "@/utils/scripts/organization";
import OrgOverviewPage from "./orgOverview";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function OrganizationOverview() {
    const router = useRouter();
    const [userOrg, setuserOrg] = useState<any>([]);

    useEffect(() => {
        getUserOrganizationID().then(setuserOrg);
    },[]);

    useEffect(() => {
        if(userOrg.length !== 0 && userOrg[0]?.FK_organizations == null){
            router.push("/dashboard/organization/overview/orgSignUp");
        }
    },[userOrg]);

    return(
        <div className="">
            <PageHeading header="Overview" description="Your organization"/>
            {/* Redirects user to correct org page(sign up or overview) */}
            {
                userOrg.length === 0 ? <div className="text-center mt-8 text-darkmaroon">Getting organization data</div> 
                : (userOrg[0]?.FK_organizations == null ?  <div></div> : <OrgOverviewPage/>)
            }
        </div>
    );
}