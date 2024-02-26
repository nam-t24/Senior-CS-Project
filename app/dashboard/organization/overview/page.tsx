"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import { getUserOrganizationID } from "@/utils/scripts/organization";
import OrgSignUpPage from "./orgSignUp";
import OrgOverviewPage from "./orgOverview";
import { useState, useEffect } from "react";

export default function OrganizationOverview() {
    const [userOrg, setuserOrg] = useState<any>([]);

    useEffect(() => {
        getUserOrganizationID().then(setuserOrg);
    },[]);


    return(
        <div className="">
            <PageHeading header="Overview" description={userOrg[0]?.FK_organizations == null ? "Your are currently not part of any organization" : "Your organization"}/>
            {
                userOrg[0]?.FK_organizations == null ? <OrgSignUpPage/> : <OrgOverviewPage/>
            }
        </div>
    );
}