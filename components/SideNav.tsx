"use client";
import { Caveat } from "next/font/google" 
import LogoutIcon from '@mui/icons-material/Logout';
import { signOut } from "./SignOutFunction";

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
        <div className="2xl:text-lg text-base font-extralight text-neutral-400 my-1 2xl:pl-3 pl-2">
            {sectionName}
        </div>
    )
}

export default function SideNav() {

    return (
        <div className="fixed left-0 top-0 2xl:w-96 w-64 bg-darkmaroon text-white h-screen 2xl:py-8 py-6 2xl:px-8 px-6">
            <div className={`${caveat.className} 2xl:text-6xl text-5xl`}>
                Minted
            </div>
            
            {/* Navigation Links */}
            <div className="w-11/12">
                {/* Account Section */}
                <div className="my-6 2xl:mt-16 mt-10">
                    <NavSection sectionName="Account"/>
                    <HorizontalLine/>
                    <div  className="font-light 2xl:text-2xl text-lg">
                        <p className="rounded-lg my-2 hover:bg-lightmaroon 2xl:py-2 py-1 2xl:px-3 px-2">Profile</p>
                    </div>
                </div>
                {/* Org Section */}
                <div className="my-6">
                    <NavSection sectionName="Organization"/>
                    <HorizontalLine/>
                    <div className="font-light 2xl:text-2xl text-lg">
                        <p className="rounded-lg my-2 hover:bg-lightmaroon 2xl:py-2 py-1 2xl:px-3 px-2"> Overview</p>
                        <p className="rounded-lg my-2 hover:bg-lightmaroon 2xl:py-2 py-1 2xl:px-3 px-2"> Grants</p>
                        <p className="rounded-lg my-2 hover:bg-lightmaroon 2xl:py-2 py-1 2xl:px-3 px-2"> History</p>
                    </div>
                </div>
                {/* Browse Section */}
                <div className="my-6">
                    <NavSection sectionName="Browse"/>
                    <HorizontalLine/>
                    <div className="font-light 2xl:text-2xl text-lg">
                        <p className="rounded-lg my-2 hover:bg-lightmaroon 2xl:py-2 py-1 2xl:px-3 px-2">Open Grants</p>
                        <p className="rounded-lg my-2 hover:bg-lightmaroon 2xl:py-2 py-1 2xl:px-3 px-2">Search</p>
                    </div>
                </div>
            </div>
            
            {/* Log Out */}
            <div className="my-44">
                <HorizontalLine/>
                <button className = "flex flex-nowrap justify-start items-center space-x-4 > * + * my-2 2xl:text-2xl text-lg w-auto font-light px-3" onClick={() => signOut()}>
                    <p className="">Log out</p>
                    <LogoutIcon fontSize="inherit"/>
                </button>
            </div>
        </div>
    )
}