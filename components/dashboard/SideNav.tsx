"use client";
import { Caveat } from "next/font/google" 
import Link from "next/link";
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "../scripts/accountFunctions";

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
                        <p className="rounded-lg my-2 hover:bg-lightmaroon 2xl:py-2 py-1 2xl:px-3 px-2">Profile</p>
                    </div>
                </div>
                {/* Org Section */}
                <div className="my-6">
                    <NavSection sectionName="Organization"/>
                    <HorizontalLine/>
                    <div className="font-light 2xl:text-xl text-lg">
                        <p className="rounded-lg my-2 hover:bg-lightmaroon 2xl:py-2 py-1 2xl:px-3 px-2"> Overview</p>
                        <p className="rounded-lg my-2 hover:bg-lightmaroon 2xl:py-2 py-1 2xl:px-3 px-2"> Grants</p>
                        <p className="rounded-lg my-2 hover:bg-lightmaroon 2xl:py-2 py-1 2xl:px-3 px-2"> History</p>
                    </div>
                </div>
                {/* Browse Section */}
                <div className="my-6">
                    <NavSection sectionName="Browse"/>
                    <HorizontalLine/>
                    <div className="font-light 2xl:text-xl text-lg">
                        <p className="rounded-lg my-2 hover:bg-lightmaroon 2xl:py-2 py-1 2xl:px-3 px-2">Open Grants</p>
                        <p className="rounded-lg my-2 hover:bg-lightmaroon 2xl:py-2 py-1 2xl:px-3 px-2">Search</p>
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