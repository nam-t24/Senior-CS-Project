"use client"
import Link from "next/link";
import { useState } from "react";
import { Caveat } from 'next/font/google';
import { createProfile } from "@/utils/scripts/profiles";
import { useRouter } from "next/navigation";

const caveat = Caveat({ subsets: ['latin'] })

export default function Login() {

  // Form data
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const router = useRouter();

  return (
    <div className="2xl:bg-[url('/assets/backgrounds/loginBG_desktop.svg')] bg-[url('/assets/backgrounds/loginBG_laptop.svg')] bg-cover bg-center bg-no-repeat h-screen min-h-screen w-full relative flex justify-center items-center">
        <div className="2xl:pt-6 pt-4 2xl:pl-10 pl-6 absolute top-0 left-0"><Link href="/" className={`${caveat.className} 2xl:text-6xl text-5xl text-primary font-medium`}>Minted</Link></div>
        
        {/* Create Account Card */}
        <div className="2xl:w-[30rem] w-[28rem] min-h-[34rem] bg-background/50 backdrop-blur-md rounded-md py-8 px-10 animate-in">
          <h1 className="2xl:text-5xl text-4xl font-medium">Welcome,</h1>
          <p className="mt-2 2xl:text-2xl text-xl">Create an account</p>

          {/* Form Section */}
          <div className="text-neutral-600 mt-6 w-full">
            <form onSubmit={e => e.preventDefault()}>
            <div className="flex flex-row">
              <p className="2xl:text-sm text-xs">FULL NAME*</p>
            </div>
            <input className="w-full text-heading 2xl:text-lg border-b-2 border-neutral-600 bg-transparent pb-2 mt-2 focus:outline-none placeholder:text-neutral-500" placeholder="John Doe" type="text" onChange={(e) => (setName(e.target.value))}/>
            <p className="2xl:text-sm text-xs mt-4">BIO</p>
            <div className="relative">
              <textarea className="w-full text-heading 2xl:text-lg border-b-2 border-neutral-600 bg-transparent pb-2 mt-2 focus:outline-none placeholder:text-neutral-500 pr-8 resize-none " rows={4} placeholder="Hi! I'm John Doe and I work at a Non-Profit Organization that helps feed the homeless." onChange={(e) => (setBio(e.target.value))}/>
            </div>
            <p className="2xl:text-sm text-xs">* Required</p>

            <button type="button" className="bg-darkmaroon text-primary w-full p-3 rounded-md font-medium my-6 2xl:text-xl text-lg enabled:hover:brightness-125 disabled:bg-lightmaroon" disabled={name==""} onClick={() => {createProfile(name, bio); router.push("/dashboard")}}>Create Account</button>
            
            </form>
          </div>

        </div>
    </div>
  );
}
