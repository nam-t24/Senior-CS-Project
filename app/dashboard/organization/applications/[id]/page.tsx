"use client";
import PageHeading from "@/components/dashboard/PageHeading";
import { useState, useEffect } from "react";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { formatDate } from "@/utils/helperFunctions";
import { getApplicationInfo } from "@/utils/scripts/applications";

// Page to view application with appID as ID
export default function ApplicationInfo({ params }: { params: { id: string } }) {
    const [grantName, setGrantName] = useState("");
    const [description, setDescription] = useState("");
    const [purpose, setPurpose] = useState("");
    const [timeline, setTimeline] = useState("");
    const [status, setStatus] = useState("");
    const [dateApplied, setDateApplied] = useState("");
    const [noData, setNoData] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            const data = await getApplicationInfo(+params.id);
            if (data === null || data.length === 0) {
                setNoData(true);
                setLoading(false);
                return;
            }
            const appData = data[0];
            setGrantName(appData.FK_grantID.name);
            setDescription(appData.description);
            setPurpose(appData.purpose);
            setTimeline(appData.timeline);
            setStatus(appData.status);
            setDateApplied(formatDate(appData.created_at));
            setLoading(false);
        };
        getData();
    }, []);

    return (
        <div className="">
            <PageHeading
                header="Application Information"
                description="View application information"
            />
            {!loading && (
                <>
                    {noData ? (
                        <div className="mt-24 2xl:text-xl text-lg text-center">
                            Application does not exist or an error occured, check log for error
                        </div>
                    ) : (
                        <>
                            {/* Button to take user back to applications page */}
                            <Link
                                href="/dashboard/organization/applications"
                                className="inline-flex items-center 2xl:mt-8 mt-6 2xl:text-lg"
                            >
                                <ChevronLeftIcon />
                                Go back to applications
                            </Link>

                            {/* Application document section */}
                            <div className="border-2 border-gray-200 w-[50rem] rounded-lg mx-auto 2xl:mt-16 mt-8 2xl:py-16 py-8 px-16 bg-[#FFFEFE] animate-in shadow">
                                <div className="2xl:text-4xl text-3xl font-medium text-center">
                                    {grantName}
                                </div>

                                <div className="text-sm text-body 2xl:mt-12 mt-10 mb-1">
                                    Description:
                                </div>
                                <div className="2xl:text-base text-sm">{description}</div>

                                <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
                                    Purpose:
                                </div>
                                <div className="">{purpose}</div>

                                <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
                                    Timeline:
                                </div>
                                <div className="">{timeline}</div>

                                <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
                                    Status:
                                </div>
                                <div className="">{status}</div>

                                <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
                                    Date Applied:
                                </div>
                                <div className="">{dateApplied}</div>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}
