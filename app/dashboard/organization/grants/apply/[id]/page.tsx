"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import { useToast } from "@/components/ui/use-toast";
import { createApplication } from "@/utils/scripts/applications";
import { getGrantInfo } from "@/utils/scripts/grants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Apply({ params }: { params: { id: string } }) {
    const router = useRouter();
    const { toast } = useToast();
    const [noData, setNoData] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [showErrors, setShowErrors] = useState(false);
    const [grantName, setGrantName] = useState("");
    const [description, setDescription] = useState("");
    const [purpose, setPurpose] = useState("");
    const [timeline, setTimeline] = useState("");

    useEffect(() => {
        const getGrantData = async () => {
            const data = await getGrantInfo(+params.id);
            if (data === null || data.length === 0) {
                setNoData(true);
                return;
            }
            setGrantName(data[0].name);
        }
        getGrantData();
    }, [])

    const handleSubmit = async () => {
        if (description === "" || purpose === "" || timeline === "") {
            setShowErrors(true);
            return;
        }
        setSubmitting(true);

        const error = await createApplication(description, purpose, timeline, +params.id);
        if (error) {
            toast({
                variant: "destructive",
                title: "Unable to apply",
                description: "Check log for error",
            })
            setSubmitting(false);
            return;
        }

        toast({
            title: "Application submitted",
        })
        setSubmitting(false);
        setTimeout(() => { router.push('/dashboard/organization/applications') }, 500)
    }

    return (
        <div>
            <PageHeading
                header="Application"
                description="Apply to a grant"
            />
            {noData ? (
                <div className="mt-24 2xl:text-xl text-lg text-center">
                    An error occured, check log for error
                </div>
            ) : (
                <>
                    <div className="border-2 border-gray-200 w-[50rem] rounded-lg mx-auto mt-8 py-8 px-16 bg-[#FFFEFE] animate-in shadow">
                        <div className="flex flex-col items-center">
                            <div className="inline-block border-b-2 border-body text-center bg-transparent py-1 px-2 text-2xl w-3/5">{grantName}</div>
                        </div>

                        <div className="text-body mb-1 mt-16">Description*</div>
                        <textarea
                            className="rounded-md py-2 px-3 min-h-32 w-full bg-slate-100"
                            placeholder="Tell us about your organization"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <div className="text-sm text-red-700 h-5">
                            {showErrors && description === "" && "Field required"}
                        </div>

                        <div className="text-body mb-1 mt-6">Purpose</div>
                        <textarea
                            className="rounded-md py-2 px-3 min-h-32 w-full bg-slate-100"
                            placeholder="Tell us about your project"
                            onChange={(e) => setPurpose(e.target.value)}
                        />
                        <div className="text-sm text-red-700 h-5">
                            {showErrors && purpose === "" && "Field required"}
                        </div>

                        <div className="text-body mb-1 mt-6">Timeline</div>
                        <textarea
                            className="rounded-md py-2 px-3 min-h-32 w-full bg-slate-100"
                            placeholder="Give us a timeline of your project"
                            onChange={(e) => setTimeline(e.target.value)}
                        />
                        <div className="text-sm text-red-700 h-5">
                            {showErrors && timeline === "" && "Field required"}
                        </div>

                        <button
                            className="block border-2 border-darkmaroon 2xl:text-lg text-darkmaroon hover:bg-darkmaroon/20 rounded-md py-1 px-2 mt-16 font-medium"
                            onClick={() => handleSubmit()}
                        >
                            {submitting ? "Submitting..." : "Submit Application"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
