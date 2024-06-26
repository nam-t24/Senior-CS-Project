import Link from "next/link";
import { Caveat } from 'next/font/google';
import { checkLoggedIn } from "@/utils/scripts/accountFunctions";
import HowItWorks from "@/components/homepage/howItWorks";
import WhyMinted from "@/components/homepage/whyMinted";
import About from "@/components/homepage/about";
import Footer from "@/components/homepage/footer";

const caveat = Caveat({ subsets: ['latin'] })

export default async function Index() {
  // Redirect user to dashboard if logged in
  await checkLoggedIn();

  return (
    <>
      <div className="2xl:bg-[url('/assets/backgrounds/homeBG_desktop.svg')] bg-[url('/assets/backgrounds/homeBG_laptop.svg')] bg-cover bg-center bg-no-repeat min-h-screen min-w-full relative flex justify-center items-center">
        {/* Top Nav Bar */}
        <div className="absolute top-0 w-full 2xl:h-28 h-20 flex flex-row text-wrap">
          {/* Minted Logo */}
          <div className="2xl:pt-6 pt-4 2xl:pl-10 pl-6">
            <Link
              href="/"
              className={`${caveat.className} 2xl:text-6xl text-5xl text-black font-medium`}
            >
              Minted
            </Link>
          </div>
          {/* Header Tabs */}
          <div className="2xl:px-40 px-20 2xl:space-x-20 space-x-12 flex flex-row 2xl:text-2xl text-lg text-heading items-center">
            <Link href="#HowItWorks">
              How It Works
            </Link>
            <Link href="#WhyMinted">Why Minted</Link>
            <Link href="#About">About</Link>
          </div>
          {/* Log In Button */}
          <div className="flex flex-row flex-1 text-heading justify-end items-center">
            <Link
              href="/login"
              className="2xl:mr-10 mr-6 2xl:h-14 h-12 2xl:w-40 w-32 2xl:border-4 border-2 border-darkmaroon border-solid rounded-full text-darkmaroon 2xl:text-xl text-lg 2xl:font-semibold font-medium flex justify-center items-center hover:bg-darkmaroon hover:text-primary transition duration-300"
            >
              Log In
            </Link>
          </div>
        </div>

        {/* Center Text */}
        <div className="relative space-y-12 flex flex-col text-center animate-in">
          <div className="space-y-4 2xl:text-8xl text-7xl text-darkmaroon font-semibold">
            <div>Built for Non-Profits</div>
            <div>Built for Change</div>
          </div>
          <div className="flex justify-center">
            <div className="w-1/2 2xl:text-3xl text-2xl text-heading 2xl:font-medium font-normal">
              Find opportunities to fund projects or start funding non-profits.
              We’re here to boost projects.
            </div>
          </div>
          {/* Bottom Buttons */}
          <div className="space-x-10 flex flex-row justify-center 2xl:text-2xl text-xl font-medium">
            <Link
              href="/login"
              className="2xl:h-12 h-10 2xl:w-56 w-44 bg-darkmaroon rounded-full text-primary flex justify-center items-center hover:brightness-125"
            >
              Find Funding {">"}
            </Link>
            <Link
              href="/login"
              className="2xl:h-12 h-10 2xl:w-56 w-44 rounded-full text-darkmaroon flex justify-center items-center hover:brightness-125"
            >
              Fund Now {">"}
            </Link>
          </div>
        </div>
      </div>
      <HowItWorks />
      <WhyMinted />
      <About />
      <Footer />
    </>
  );
}