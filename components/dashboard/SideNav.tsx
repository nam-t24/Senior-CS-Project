"use client";
import { Caveat } from "next/font/google" 
import Link from "next/link";
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "../../utils/scripts/accountFunctions";
import NavLink from "./NavLink"
import { useEffect, useState } from "react";
import { getUserIDandOrgID } from "@/utils/scripts/organization";
import { hasInvites } from "@/utils/scripts/invites";

const caveat = Caveat({
    subsets: ['latin'],
    weight: ['400'],
})

const HorizontalLine = () => {
    return (
        <div className="border-b border-neutral-400"/>
    )
}

const NavSection = ({sectionName} : {sectionName: string}) => {
    return (
        <div className="2xl:text-base text-sm font-extralight text-neutral-400 my-1 2xl:pl-3 pl-2">
            {sectionName}
        </div>
    )
}

export default function SideNav() {
    const [isInOrg, setIsInOrg] = useState(false);
    const [userID, setUserID] = useState("");
    const [invites, setInvites] = useState(false);

    useEffect(() => {
        const getData = async()=> {
            const {userUUID, orgID} = await getUserIDandOrgID();
            setIsInOrg(orgID === null ? false : true); 
            setUserID(userUUID);
            const userHasInvites = await hasInvites(userUUID);
            setInvites(userHasInvites);
        }

        getData();
    }, [])
    

    return (
        <div className="fixed left-0 top-0 2xl:w-80 w-64 bg-darkmaroon text-white h-screen py-6 2xl:px-8 px-6">
            <Link href="/" className={`${caveat.className} text-5xl`}>
                Minted
            </Link>
            
            {/* Navigation Links */}
            <div className="w-11/12">
                {/* Account Section */}
                <div className="my-6 2xl:mt-16 mt-10">
                    <NavSection sectionName="Account"/>
                    <HorizontalLine/>
                    <div  className="font-light 2xl:text-xl text-lg">
                        <NavLink href="/dashboard" exact={true} activeOptions="bg-lightmaroon" className="rounded-lg my-2 2xl:py-2 py-1 2xl:px-3 px-2 hoverRaise">Profile</NavLink>
                    </div>
                </div>
                {/* Org Section */}
                <div className="my-6">
                    <NavSection sectionName="Organization"/>
                    <HorizontalLine/>
                    <div className="font-light 2xl:text-xl text-lg">
                        <NavLink href={isInOrg ? "/dashboard/organization/overview" : "/dashboard/organization/overview/orgSignUp"} exact={false} activeOptions="bg-lightmaroon" className="rounded-lg my-2 2xl:py-2 py-1 2xl:px-3 px-2 hoverRaise" notification={invites}>Overview</NavLink>
                        {isInOrg && 
                        <NavLink href="/dashboard/organization/grants" exact={true} activeOptions="bg-lightmaroon" className="rounded-lg my-2 2xl:py-2 py-1 2xl:px-3 px-2 hoverRaise">Grants</NavLink>
                        }
                        {isInOrg &&
                        <NavLink href="/dashboard/organization/history" exact={true} activeOptions="bg-lightmaroon" className="rounded-lg my-2 2xl:py-2 py-1 2xl:px-3 px-2 hoverRaise">History</NavLink>
                        }
                    </div>
                </div>
                {/* Browse Section */}
                <div className="my-6">
                    <NavSection sectionName="Browse"/>
                    <HorizontalLine/>
                    <div className="font-light 2xl:text-xl text-lg">
                        <NavLink href="/dashboard/browse/opengrants" exact={true} activeOptions="bg-lightmaroon" className="rounded-lg my-2 2xl:py-2 py-1 2xl:px-3 px-2 hoverRaise">Open Grants</NavLink>
                        <NavLink href="/dashboard/browse/search" exact={true} activeOptions="bg-lightmaroon" className="rounded-lg my-2 2xl:py-2 py-1 2xl:px-3 px-2 hoverRaise">Search</NavLink>
                    </div>
                </div>
            </div>
            
            {/* Log Out */}
            <div className="2xl:mt-44 mt-36">
                <HorizontalLine/>
                <button className = "flex flex-nowrap justify-start items-center space-x-3 > * + * my-2 2xl:text-xl text-lg w-auto font-light px-3 2xl:mt-4 hover:brightness-75" onClick={() => signOut()}>
                    <LogoutIcon fontSize="inherit"/>
                    <p className="">Log out</p>
                </button>
            </div>
        </div>
    )
}