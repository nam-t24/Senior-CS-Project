"use client";
import PageHeading from "@/components/dashboard/PageHeading";
import { useState, useEffect } from "react";
import {
  getGrantInfo,
  canEdit,
  deleteGrant,
  closeGrant,
} from "@/utils/scripts/grants";
import { getIDandOrgType } from "@/utils/scripts/organization";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { formatDate } from "@/utils/helperFunctions";

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

// Page to view grant with grantID as ID
export default function GrantInfo({ params }: { params: { id: string } }) {
  const { toast } = useToast();
  const router = useRouter();

  const [grantName, setGrantName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [amount, setAmount] = useState<number>(null);
  const [deadline, setDeadline] = useState("");
  const [datePosted, setDatePosted] = useState("");
  const [organization, setOrganization] = useState("");
  const [canEditGrant, setCanEditGrant] = useState(false);
  const [isNonProfit, setIsNonProfit] = useState(false);

  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const data = await getGrantInfo(+params.id);
      if (data === null || data.length === 0) {
        setNoData(true);
        setLoading(false);
        return;
      }
      const grantData = data[0];
      setGrantName(grantData.name);
      setDescription(grantData.description);
      setRequirements(grantData.requirements);
      setAmount(grantData.amount);
      setDeadline(formatDate(grantData.deadline));
      setDatePosted(formatDate(grantData.created_at));
      setOrganization(grantData.organizations.name);
      setLoading(false);
    };

    getData();

    // Checking if user org is the owner of the grant
    const checkRestriction = async () => {
      const editRestriction = await canEdit(+params.id);
      setCanEditGrant(editRestriction);
    };
    checkRestriction();

    // Checking if user org is a non-profit
    const checkNonProfit = async () => {
      const IDandOrgType = await getIDandOrgType();
      if(IDandOrgType === null) {
        toast({
          variant: "destructive",
          title: "Unable to check organization",
          description: "Try again later and check log for error",
        });
        return;
      }
      setIsNonProfit(IDandOrgType.isNonProfit);
    };
    checkNonProfit();
  }, []);

  const handleDelete = async () => {
    const error = await deleteGrant(+params.id);
    if (error) {
      toast({
        variant: "destructive",
        title: "Unable to delete grant",
        description: "Check log for error",
      });
      return;
    }
    toast({
      title: "Grant deleted",
    });
    router.push("/dashboard/organization/grants");
    return;
  };

  const handleClose = async () => {
    const error = await closeGrant(+params.id);
    if (error) {
      toast({
        variant: "destructive",
        title: "Unable to close grant",
        description: "Check log for error",
      });
      return;
    }
    toast({
      title: "Grant closed",
    });
    router.push("/dashboard/organization/grants");
    return;
  };

  return (
    <div className="">
      <PageHeading
        header="Grant Information"
        description="View grant information"
      />
      {!loading && (
        <>
          {noData ? (
            <div className="mt-24 2xl:text-xl text-lg text-center">
              Grant does not exist or an error occured, check log for error
            </div>
          ) : (
            <>
              {/* Button to take user back to grants page */}
              {canEditGrant && (
                <Link
                  href="/dashboard/organization/grants"
                  className="inline-flex items-center 2xl:mt-8 mt-6 2xl:text-lg"
                >
                  <ChevronLeftIcon />
                  Go back to grants
                </Link>
              )}

              {/* Grant document section */}
              <div className="border-2 border-gray-200 w-[50rem] rounded-lg mx-auto 2xl:mt-16 mt-8 2xl:py-16 py-8 px-16 bg-[#FFFEFE] animate-in shadow">
                <div className="2xl:text-4xl text-3xl font-medium text-center">
                  {grantName}
                </div>

                <div className="text-sm text-body 2xl:mt-12 mt-10 mb-1">
                  Description:
                </div>
                <div className="2xl:text-base text-sm">{description}</div>

                <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
                  Requirements:
                </div>
                <div className="">
                  {requirements === "" ? "No requirements" : requirements}
                </div>

                <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
                  Grant Amount:
                </div>
                <div className="">${amount}</div>

                <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
                  Deadline:
                </div>
                <div className="">{deadline}</div>

                <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
                  Date Posted:
                </div>
                <div className="">{datePosted}</div>

                <div className="text-sm text-body 2xl:mt-10 mt-6 mb-1">
                  Organization:
                </div>
                <div className="">{organization}</div>
                {canEditGrant && (
                  <Link
                    href={`/dashboard/organization/grants/viewApplications/${params.id}`}
                    className="inline-block text-lg 2xl:mt-12 mt-10 px-4 py-1 border-2 border-darkmaroon text-darkmaroon hover:bg-darkmaroon/20 rounded-md font-medium"
                  >
                    View Applications
                  </Link>
                )}
                {isNonProfit && (
                  <Link
                    href={`/dashboard/organization/grants/apply/${params.id}`}
                    className="inline-block text-lg 2xl:mt-12 mt-10 px-4 py-1 border-2 border-darkmaroon text-darkmaroon hover:bg-darkmaroon/20 rounded-md font-medium"
                  >
                    Apply
                  </Link>
                )}
              </div>

              {/* Edit buttons */}
              {canEditGrant && (
                <div className="w-[50rem] mx-auto flex space-x-8 justify-between items-center 2xl:mt-14 mt-10">
                  {/* Nondestructive buttons */}
                  <div className="flex space-x-4">
                    {/* Edit Button */}
                    <Link
                      href={`/dashboard/organization/grants/editGrant/${params.id}`}
                      className="flex items-center space-x-2 2xl:text-lg text-primary hover:brightness-125 bg-darkmaroon rounded-md py-1 px-3 font-medium"
                    >
                      <EditIcon fontSize="inherit" />
                      <p>Edit Grant</p>
                    </Link>

                    {/* Close Grant */}
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <div className="2xl:text-lg text-darkmaroon rounded-md py-1 px-3 bg-maroon/20 hover:bg-maroon/30 font-medium">
                          Close Grant
                        </div>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Closed grants will no longer accept applications or
                            be able to choose a recipient. The grant can still
                            be viewed under your organization history.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleClose()}>
                            Close Grant
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>

                  {/* Delete Button */}
                  <AlertDialog>
                    <AlertDialogTrigger>
                      <div className="rounded-md py-1 px-3 hover:bg-red-100 border-2 border-red-400 text-red-700">
                        Delete Grant
                      </div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your grant from your organization.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete()}>
                          Delete Grant
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
