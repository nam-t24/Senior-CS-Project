"use client";
import PageHeading from "@/components/dashboard/PageHeading";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getApplicationsByGrantID,
  updateApplicationStatus, finishReviewForGrantID
} from "@/utils/scripts/applications";
import { getGrantInfo } from "@/utils/scripts/grants";
import { useToast } from "@/components/ui/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// Page to view all applications for a grant with grantID as ID
export default function ViewApplications({
  params,
}: {
  params: { grantID: string };
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const statusColors = {
    accepted: {
      bg: "bg-[#84DF58]/25",
      text: "text-[#409019]",
    },
    rejected: {
      bg: "bg-[#EA609C]/25",
      text: "text-[#872852]",
    },
    pending: {
      bg: "bg-[#FFDF85]/25",
      text: "text-[#ED5C16]",
    },
  };

  const [applicationList, setApplicationList] = useState([]);
  const [grantName, setGrantName] = useState("");

  // Info
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [status, setStatus] = useState(""); // ["Pending", "Accepted", "Rejected"]
  // Answers
  const [description, setDescription] = useState("");
  const [purpose, setPurpose] = useState("");
  const [timeline, setTimeline] = useState("");

  // Index of application currently in view
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const getData = async () => {
      const applications = await getApplicationsByGrantID(+params.grantID);
      if (applications === null) {
        toast({
          variant: "destructive",
          title: "Unable to retrieve applications",
          description: "Reload page or check another time",
        });
        setLoading(false);
        return;
      }
      setApplicationList(applications);
      if(applications.length > 0) {
        setOrgName(applications[0].applicantInfo.name);
        setOrgEmail(applications[0].applicantInfo.email);
        setStatus(applications[0].status);
        setDescription(applications[0].description);
        setPurpose(applications[0].purpose);
        setTimeline(applications[0].timeline);
      }
      setLoading(false);
    };
    getData();

    const getGrantName = async () => {
      const grantInfo = await getGrantInfo(+params.grantID);
      if (grantInfo === null) {
        toast({
          variant: "destructive",
          title: "Unable to retrieve grant name",
          description: "Reload page or check another time",
        });
        return;
      }
      setGrantName(grantInfo[0].name);
    }
    getGrantName();
  }, []);

  const handleAccept = async() => {
    const apps = [...applicationList];
    // Only allow for one accepted application
    for (const app of apps) {
      if (app.status === "accepted") {
        const error = await updateApplicationStatus(app.id, "pending");
        if (error) {
          toast({
            variant: "destructive",
            title: "Unable to update application status",
            description: "Try again later and check log for error",
          });
          return;
        }
        app.status = "pending";
      }
    }

    const error = await updateApplicationStatus(apps[currentIdx].id, "accepted");
    if (error) {
      toast({
        variant: "destructive",
        title: "Unable to update application status",
        description: "Try again later and check log for error",
      });
      return;
    }
    apps[currentIdx].status = "accepted";
    setApplicationList(apps);
    setStatus("accepted");
  };

  const handleReject = async() => {
    const apps = [...applicationList];
    const error = await updateApplicationStatus(apps[currentIdx].id, "rejected");
    if (error) {
      toast({
        variant: "destructive",
        title: "Unable to update application status",
        description: "Try again later and check log for error",
      });
      return;
    }
    apps[currentIdx].status = "rejected";
    setApplicationList(apps);
    setStatus("rejected");
  };

  const handleFinishReview = async() => {
    let acceptedOrg = null;
    for (const app of applicationList) {
      if (app.status === "accepted") {
        acceptedOrg = app.FK_orgApply;
      }
    }
    const error = await finishReviewForGrantID(+params.grantID, acceptedOrg);
    if (error) {
      toast({
        variant: "destructive",
        title: "Unable to mark grant as reviewed",
        description: "Try again later and check log for error",
      });
      return;
    }
    
    acceptedOrg === null
      ? router.push(
          `/dashboard/organization/history/`
        )
      : router.push(
          `/dashboard/organization/history/acceptedGrant/${params.grantID}`
        );
  };

  const containsAccepted = () =>
    applicationList.some((app) => app.status === "accepted");

  return (
    <>
      <PageHeading
        header="View Applications"
        description="View all applications from your grant"
      />
      <div className="py-8 animateAppear">
        <h1 className="text-2xl">Grant: {grantName}</h1>
        <div className="text-body 2xl:w-1/3 w-1/2 text-sm mt-2">
          Mark applications as accepted or rejected to keep track of reviewed
          applications. Once applications are reviewed, click on the{" "}
          <p className="text-maroon inline">Finish Review</p> button. You can
          finish review at any time during the process.
        </div>

        {!loading && (applicationList.length === 0 ? <div className="mt-8">There are currently no applications</div> :
          <>
            <div className="flex 2xl:justify-center 2xl:mt-12 mt-8 space-x-1 2xl:h-[60rem] 2xl:max-h-[60rem] h-[50rem] max-h-[50rem] animateAppear">
              {/* Application List */}
              <section className="2xl:w-96 w-80 flex flex-col space-y-2 h-full overflow-y-auto pr-3">
                {/* Non-profit org card */}
                {applicationList.map((app, index) => {
                  return (
                    <button
                      key={index}
                      className={`w-full border-2 ${
                        index === currentIdx
                          ? "border-darkmaroon"
                          : "border-gray-300"
                      }  ${
                        index !== currentIdx && "hover:border-darkmaroon/50"
                      } transition duration-200 p-3 rounded-lg flex items-center space-x-2 shadow-sm`}
                      onClick={() => {
                        setCurrentIdx(index);
                        setOrgName(app.applicantInfo.name);
                        setOrgEmail(app.applicantInfo.email);
                        setStatus(app.status);
                        setDescription(app.description);
                        setPurpose(app.purpose);
                        setTimeline(app.timeline);
                      }}
                    >
                      <div className="font-medium grow truncate text-left">
                        {app.applicantInfo.name}
                      </div>
                      <div
                        className={`min-w-24 ${statusColors[app.status].bg} ${
                          statusColors[app.status].text
                        } px-2 py-1 rounded-md text-center text-sm font-medium`}
                      >
                        {app.status}
                      </div>
                    </button>
                  );
                })}
              </section>

              {/* Application doc */}
              <section className="2xl:flex-none flex-1 2xl:w-[60rem] border-[3px] border-gray-300 rounded-lg overflow-y-auto 2xl:py-12 2xl:px-14 p-8">
                {/* Title */}
                <h1 className="text-3xl font-medium">{orgName}</h1>
                {/* Email */}
                <div className="flex space-x-4 items-center text-body mt-3">
                  <p>{orgEmail}</p>
                  <ContentCopyIcon
                    className="cursor-pointer"
                    fontSize="inherit"
                    onClick={() => {
                      navigator.clipboard.writeText(orgEmail);
                    }}
                  />
                </div>
                {/* Accept/Reject Buttons */}
                <div className="flex space-x-4 my-6">
                  <button
                    onClick={() => handleAccept()}
                    className="bg-darkmaroon w-32 py-1 rounded-md text-primary flex items-center justify-center space-x-2 hover:brightness-125"
                  >
                    <CheckIcon fontSize="medium" />
                    <p>Accept</p>
                  </button>
                  <button
                    onClick={() => handleReject()}
                    className="bg-darkmaroon/30 text-darkmaroon w-32 py-1 rounded-md flex items-center justify-center space-x-2 hover:brightness-125"
                  >
                    <CloseIcon fontSize="medium" />
                    <p>Reject</p>
                  </button>
                </div>
                {/* Status */}
                <div className="text-body border-b-2 border-gray-400 pb-6 mb-8">
                  Status: {status}
                </div>
                {/* Application Answers */}
                <div className="text-body text-sm">
                  Organization Description:
                </div>
                <div className="mt-1">{description}</div>

                <div className="text-body text-sm 2xl:mt-10 mt-8">
                  Project Purpose:
                </div>
                <div className="mt-1">{purpose}</div>

                <div className="text-body text-sm 2xl:mt-10 mt-8">
                  Project Timeline:
                </div>
                <div className="mt-1">{timeline}</div>
              </section>
            </div>
            <AlertDialog>
              <AlertDialogTrigger>
                <div className="bg-darkmaroon text-primary py-2 px-6 rounded-md mt-12 text-lg hover:brightness-125">
                  Finish Review
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {containsAccepted()
                      ? "Are you sure?"
                      : "No applications accepted"}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {containsAccepted()
                      ? "Confirm that you are done reviewing applications for this grant."
                      : "Finishing application review without accepting any applications will permanently close this grant."}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleFinishReview()}>
                    Finish Review
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <div className="text-body w-1/2 text-sm mt-4">
              Once you finish reviewing, you can view follow-up details on this
              grant under your <p className="text-maroon inline">History</p>{" "}
              tab.
            </div>
          </>)
        }
      </div>
    </>
  );
}
