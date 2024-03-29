"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import { useState, useEffect } from "react";
import { getGrantInfo } from "@/utils/scripts/grants";

export default function GrantInfo({ params }: { params: { id: string } }) {
    const [grantName, setGrantName] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [amount, setAmount] = useState<number>(null);
    const [deadline, setDeadline] = useState("");
    const [datePosted, setDatePosted] = useState("");


    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        const getData = async() => {
            const data = await getGrantInfo(+params.id);
            if(data === null || data.length === 0){
                setNoData(true);
                setLoading(false);
                return;
            }
            const grantData = data[0];
            setGrantName(grantData.name);
            setDescription(grantData.description);
            setRequirements(grantData.requirements);
            setAmount(grantData.amount);
            const date = grantData.deadline;
            setDeadline(months[date.slice(5, 7)] + " " + date.slice(8, 10) + ", " + date.slice(0, 4));
            const createdDate = grantData.created_at;
            setDatePosted(months[createdDate.slice(5, 7)] + " " + createdDate.slice(8, 10) + ", " + createdDate.slice(0, 4))
            setLoading(false);
        }

        getData();

    }, [])
    
    return (
        <div className="">
            <PageHeading header="Grant Information" description="View grant information"/>
            {!loading && <>
            {noData ? 
            <div className="mt-24 2xl:text-xl text-lg text-center">Grant does not exist or an error occured, check log for error</div>
            : 
            <div className="border-[1px] border-gray-500 w-[50rem] rounded-lg mx-auto 2xl:mt-16 mt-8 2xl:py-16 py-8 px-16 bg-[#FFFEFE] animate-in">
                <div className="2xl:text-4xl text-3xl font-medium text-center">{grantName}</div>

                <div className="text-sm text-body 2xl:mt-12 mt-10 mb-1">Description:</div>
                <div className="2xl:text-base text-sm">{description}</div>

                <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">Requirements:</div>
                <div className="">{requirements==="" ? "No requirements": requirements}</div>

                <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">Grant Amount:</div>
                <div className="">${amount}</div>

                <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">Deadline:</div>
                <div className="">{deadline}</div>

                <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">Date Posted:</div>
                <div className="">{datePosted}</div>
                
            </div>
            }
            </>}
        </div>
    );
}