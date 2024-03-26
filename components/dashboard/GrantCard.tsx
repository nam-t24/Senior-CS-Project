import Link from "next/link"
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function GrantCard({grantID, name, amount, description, createdDate}: {grantID: number, name: string, amount: number, description: string, createdDate: string}){
    const months = {
        "01": "January",
        "02": "February",
        "03": "March",
        "04": "April",
        "05": "May",
        "06": "June",
        "07": "July",
        "08": "August",
        "09": "September",
        "10": "October",
        "11": "November",
        "12": "December",

    }

    const date = months[createdDate.slice(5, 7)] + " " + createdDate.slice(8, 10) + ", " + createdDate.slice(0, 4);
    return(
        <div className="flex flex-col justify-between border-2 border-neutral-400 px-4 py-4 rounded-lg bg-[#FFFEFE] 2xl:w-[28rem] w-[20rem] 2xl:mr-6 mr-6 2xl:my-4 my-3 group hover:text-darkmaroon hover:border-darkmaroon transition duration-500">
            <div className="">
                <div className="flex justify-between items-start">
                    <div className="2xl:text-2xl text-lg font-semibold">{name}</div>
                    <Link href={`/dashboard/organization/grants/${grantID}`} className="flex items-center justify-end text-sm space-x-1 hoverRaise min-w-28"><p>View Grant</p> <ChevronRightIcon fontSize="inherit"/></Link>
                </div>
                <div className="2xl:text-xl text-lg font-medium 2xl:mt-1">${amount}</div>
                <div className="2xl:text-sm text-xs 2xl:mt-4 mt-2 text-body h-24 group-hover:text-darkmaroon transition duration-500">
                    {description.length > 200 ? description.slice(0, 200)+" ..." : description}
                </div>
            </div>

            <div className="text-body 2xl:text-base text-sm group-hover:text-darkmaroon transition duration-500">
                Posted: {date}
            </div>

        </div>
    )
}