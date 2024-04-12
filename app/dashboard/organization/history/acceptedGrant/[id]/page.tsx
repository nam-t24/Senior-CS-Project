"use client";
import PageHeading from "@/components/dashboard/PageHeading";
import { useState, useEffect } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Link from "next/link";
import { getAcceptedGrantData, getAcceptedApplicationByGrantID } from "@/utils/scripts/applications";
import { useToast } from "@/components/ui/use-toast";
import { set } from "date-fns";

export default function ReviewedGrant({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const [grantName, setGrantName] = useState("");
  const [orgAccepted, setOrgAccepted] = useState("");
  const [email, setEmail] = useState("");

  const [subject, setSubject] = useState(
    "Minted - Your grant application has been accepted!"
  );
  const [body, setBody] = useState("");

  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState("");
  const [timeline, setTimeline] = useState("");

  const [loadingApplicationData, setLoadingApplicationData] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getAcceptedGrantData(+params.id);
      if (data === null) {
        toast({
          variant: "destructive",
          title: "Unable to fetch grant data",
          description: "Try again later and check log for error",
        });
        return;
      }
      setGrantName(data.name);
      setOrgAccepted(data.FK_orgFunded.name);
      setEmail(data.FK_orgFunded.email);

      const applicationData = await getAcceptedApplicationByGrantID(+params.id);
      if (applicationData === null) {
        toast({
          variant: "destructive",
          title: "Unable to fetch application data",
          description: "Try again later and check log for error",
        });
        return;
      }
      setDescription(applicationData[0].description);
      setPurpose(applicationData[0].purpose);
      setTimeline(applicationData[0].timeline);
      setLoadingApplicationData(false);
    };
    getData();
  }, []);

  return (
    <>
      <PageHeading
        header="Accepted Grant Information"
        description="Reviewed grant to follow up on"
      />
      <Link
        href="/dashboard/organization/history"
        className="inline-flex items-center 2xl:mt-8 mt-6 2xl:text-base text-sm animateDown"
      >
        <ChevronLeftIcon fontSize="medium" />
        Go back to grant history
      </Link>
      <div className="py-8 animateAppear">
        <h1 className="2xl:text-2xl text-lg  mb-2">Grant: {grantName}</h1>
        <h1 className="2xl:text-2xl text-lg">
          Organization Accepted: {orgAccepted}
        </h1>

        {/* Contact Section */}
        <section className="2xl:w-3/5 2xl:my-12 my-8 bg-gray-100 py-6 px-8 rounded-lg">
          <h1 className="text-lg pb-1 border-b-2 border-gray-400 w-[30rem]">
            Email Organization Accepted
          </h1>
          <div className="mt-6 2xl:w-[50rem] w-[40rem]">
            <div className="mb-1">Subject:</div>
            <input
              className="bg-slate-200 border border-slate-300 w-full rounded-md px-4 py-2"
              placeholder="Subject Line"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <div className="mb-1 mt-6">Body:</div>
            <textarea
              className="min-h-36 bg-slate-200 border border-slate-300 w-full rounded-md px-4 py-2"
              placeholder="Discuss next steps to set up payment with the accepted organization"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <a
              href={`mailto:${email}?subject=${subject}&body=${body}`}
              className="inline-block border-2 border-darkmaroon text-darkmaroon bg-white text-lg font-medium mt-4 px-4 py-1 rounded-md hover:bg-darkmaroon/20"
            >
              Send Email
            </a>
          </div>
        </section>

        {/* Application Answer */}
        {!loadingApplicationData && <section className="flex justify-center mt-16 animateAppear">
          <div className="w-[50rem] rounded-lg border-gray-300 border-2 2xl:py-12 2xl:px-14 p-8">
            {/* Title */}
            <h1 className="text-3xl font-medium">{orgAccepted}</h1>
            {/* Email */}
            <div className="flex space-x-4 items-center text-body mt-3">
              <p>{email}</p>
              <ContentCopyIcon
                className="cursor-pointer"
                fontSize="inherit"
                onClick={() => {
                  navigator.clipboard.writeText(email);
                }}
              />
            </div>
            <div className="bg-darkmaroon w-32 py-1 mt-3 rounded-md text-primary flex items-center justify-center space-x-2">
              <CheckIcon fontSize="medium" />
              <p>Accepted</p>
            </div>
            <div className="border-b-2 border-gray-300 my-8" />
            {/* Application Answers */}
            <div className="text-body text-sm">Organization Description:</div>
            <div className="mt-1">{description}</div>

            <div className="text-body text-sm 2xl:mt-10 mt-8">
              Project Purpose:
            </div>
            <div className="mt-1">{purpose}</div>

            <div className="text-body text-sm 2xl:mt-10 mt-8">
              Project Timeline:
            </div>
            <div className="mt-1">{timeline}</div>
          </div>
        </section>}
      </div>
    </>
  );
}
