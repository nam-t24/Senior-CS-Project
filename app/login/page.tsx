"use client"
import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { Caveat } from 'next/font/google';
import { signIn, signUp, signInWithGoogle } from "./accountFunctions";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const caveat = Caveat({ subsets: ['latin'] })

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  // Trigger between log in and create account
  const [login, setLogin] = useState(true);
  const LogInCard = useRef<any>(null);


  // Form data
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const animate = () => {
    if(LogInCard.current) {
      LogInCard.current.classList.remove("animate-in");
      LogInCard.current.offsetWidth;
      LogInCard.current.classList.add("animate-in");
    }
  }


  return (
    <div className="2xl:bg-[url('/assets/loginBG_desktop.svg')] bg-[url('/assets/loginBG_laptop.svg')] bg-cover bg-center bg-no-repeat h-screen min-h-screen w-full relative flex justify-center items-center">
        <div className="pt-4 pl-6 absolute top-0 left-0"><Link href="/" className={`${caveat.className} text-5xl text-primary font-medium`}>Minted</Link></div>
        
        {/* Log In Card */}
        <div ref={LogInCard} className="w-[28rem] min-h-[34rem] bg-background/50 backdrop-blur-md rounded-md py-8 px-10 animate-in">
          <h1 className="text-4xl font-medium">Welcome,</h1>
          <p className="mt-2 text-xl">{login ? "Log in to continue" : "Create an account"}</p>

          {/* Form Section */}
          <div className="text-neutral-600 mt-6 w-full">
            <p className="text-xs">EMAIL ADDRESS</p>
            <input className="w-full text-heading border-b-2 border-neutral-600 bg-transparent pb-2 mt-2 focus:outline-none placeholder:text-neutral-500" placeholder="name@example.com" type="email "onChange={(e) => (setEmail(e.target.value))}/>
            <p className="text-xs mt-4">PASSWORD</p>
            <div className="relative">
              <input className="w-full text-heading border-b-2 border-neutral-600 bg-transparent pb-2 mt-2 focus:outline-none placeholder:text-neutral-500" placeholder="password" type={showPassword ? "text" : "password"} onChange={(e) => (setPassword(e.target.value))}/>
              <button className="absolute right-0 top-1/2 -translate-y-1/2" onClick={() => {setShowPassword(!showPassword)}}>{showPassword ? <VisibilityOffIcon/> : <VisibilityIcon/>}</button>
            </div>

            {login ? <button className="bg-darkmaroon text-primary w-full p-3 rounded-md font-medium my-6 text-lg hover:brightness-125" onClick={() => signIn({email, password})}>Log In</button>
            :
            <button className="bg-darkmaroon text-primary w-full p-3 rounded-md font-medium my-6 text-lg hover:brightness-125" onClick={() => signUp({email, password})}>Create Account</button>
            }

            {/* Error message */}
            {searchParams?.message && (<div className="flex justify-center items-center mb-2 space-x-2 > * + * mt-[-6px] mb-4 text-heading">
              <ErrorOutlineIcon/>
              <p>{searchParams.message}</p>
            </div>)}

            <div className="w-full text-center relative">
              <div className="w-5/12 border-b-[1px] border-neutral-600 absolute left-0 top-1/2"></div>
              or
              <div className="w-5/12 border-b-[1px] border-neutral-600 absolute right-0 top-1/2"></div>
            </div>

            <button className="text-center w-full bg-primary p-3 rounded-md text-heading font-medium text-lg my-6 relative hover:brightness-95" onClick={() => signInWithGoogle()}>
              <Image src={'/assets/google.svg'} alt="Google" className="absolute left-4 top-1/2 -translate-y-1/2" width={30} height={30}/>
              Continue in with Google
            </button>
          </div>

          {/* Switch between log in and create */}
          <div className="flex mt-4">
            <div className="text-neutral-600 text-sm mr-2">{login ? "Don't have an account?" : "Already have an account?"}</div>
            <button className="text-darkmaroon text-sm hover:underline" onClick={()=>{animate(); setLogin(!login);}}>{login? "Create an Account" : "Log in"}</button>
          </div>
        </div>
    </div>
  );
}
