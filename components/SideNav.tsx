import Image from "next/image";
import { Caveat } from "next/font/google" 
import { Poppins } from "next/font/google"
import {LogOutButton} from "./svg"
const caveat = Caveat({
    subsets: ['latin'],
    weight: ['400'],
})
const poppins = Poppins({
    subsets: ['latin'],
    weight: ['200', '300'],
})
function HorizontalLine() {
    return (
        <div className="border w-8/12 ml-6"/>
    )
}
export default function SideNav() {
    return (
        <div className="sticky top-0 w-[12%] bg-[#590D24] text-white h-screen">
            <div className="ml-5 indent-6">
                <div style={{fontSize: "3.5vw"}} className={caveat.className}>
                    Minted
                </div>
                <div className="my-6">
                    <div style={{fontSize: ".8vw", fontWeight:"200"}} className={poppins.className}>
                        Account
                    </div>
                    <HorizontalLine/>
                    <div style={{fontSize: "1vw", fontWeight:"300"}} className={poppins.className}>
                        <p className="rounded-lg w-11/12 my-2 hover:bg-[#B47B84]">Profile</p>
                    </div>
                </div>
                <div className="my-6">
                    <div style={{fontSize: ".8vw", fontWeight:"200"}} className={poppins.className}>
                        Organization
                    </div>
                    <HorizontalLine/>
                    <div style={{fontSize: "1vw", fontWeight:"300" }} className={poppins.className}>
                        <p className="rounded-lg w-11/12 my-2 hover:bg-[#B47B84]"> Overview</p>
                        <p className="rounded-lg w-11/12 my-2 hover:bg-[#B47B84]"> Grants</p>
                        <p className="rounded-lg w-11/12 my-2 hover:bg-[#B47B84]"> History</p>
                    </div>
                </div>
                <div className="my-6">
                    <div style={{fontSize: ".8vw", fontWeight:"200"}} className={poppins.className}>
                        Browse
                    </div>
                    <HorizontalLine/>
                    <div style={{fontSize: "1vw", fontWeight:"300" }} className={poppins.className}>
                        <p className="rounded-lg w-11/12 my-2 hover:bg-[#B47B84]">Open Grants</p>
                        <p className="rounded-lg w-11/12 my-2 hover:bg-[#B47B84]">Search</p>
                    </div>
                </div>
                <div className="my-44">
                    <div className="border w-11/12"/>
                    <div className = "flex flex-row flex-nowrap justify-start rounded-lg w-11/12 my-2 hover:bg-[#B47B84]">
                        <p style={{fontSize: "1vw", fontWeight:"300", marginRight:"10px" }} className={poppins.className}> Log out </p>
                        <LogOutButton/>
                    </div>
                </div>
            </div>
        </div>
    )
}