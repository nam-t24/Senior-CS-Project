import Link from "next/link";
import { Caveat } from 'next/font/google';

const caveat = Caveat({ subsets: ['latin'] })

export default async function Index() {
  return (
    <div className="2xl:bg-[url('/assets/backgrounds/homeBG_desktop.svg')] bg-[url('/assets/backgrounds/homeBG_laptop.svg')] bg-cover bg-center bg-no-repeat min-h-screen min-w-full relative flex justify-center items-center">
      {/* Top Nav Bar */}
      <div className="absolute top-0 w-screen 2xl:h-28 h-20 flex flex-row text-wrap">
        {/* Minted Logo */}
        <div className="2xl:pt-6 pt-4 2xl:pl-10 pl-6"><Link href="/" className={`${caveat.className} 2xl:text-6xl text-5xl text-black font-medium`}>Minted</Link></div>
        {/* Headers (go nowhere) */}
        <div className="2xl:pl-40 pl-20 2xl:space-x-20 space-x-12 flex flex-1 text-2xl text-heading items-center">
          <Link href="/">About</Link>
          <Link href="/">How It Works</Link>
          <Link href="/">Why Minted</Link>
        </div>
        {/* Log in/out Button */}
        <div className="flex flex-1 justify-end">
          <button className="2xl:mt-6 mt-4 2xl:mr-10 mr-6 2xl:h-16 h-12 2xl:w-40 w-32 border-4 border-darkmaroon border-solid rounded-full">
            <Link href="/login" className="2xl:text-xl text-lg text-darkmaroon font-semibold">Log In</Link>
          </button>
        </div>
      </div>
    </div>
  );
}