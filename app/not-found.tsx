import Link from "next/link";
import { Caveat } from 'next/font/google';

const caveat = Caveat({ subsets: ['latin'] })

// 404 page
export default function fourzerofour() {
    return(
        <div className="2xl:bg-[url('/assets/backgrounds/loginBG_desktop.svg')] bg-[url('/assets/backgrounds/loginBG_laptop.svg')] bg-cover bg-center bg-no-repeat h-screen w-full text-primary">
            <div className="2xl:pt-6 pt-4 2xl:pl-10 pl-6"><Link href="/" className={`${caveat.className} 2xl:text-6xl text-5xl font-medium`}>Minted</Link></div>
            <div className="flex flex-col items-center 2xl:mt-44 mt-16 animate-in">
                <div className="text-9xl font-medium">404</div>
                <div className="text-xl">Page Not Found</div>
                <div className="my-8 text-lg text-center">It seems like you flew too close to the sun!<br/>This page does not exists.</div>
                <Link href="/" className="border-2 border-primary py-2 px-6 rounded-full hover:bg-darkmaroon hover:border-darkmaroon transition duration-300">Take me home</Link>
            </div>
        </div>
    )
}