"use client";
import PageHeading from "@/components/dashboard/PageHeading";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGrantInfo, updateGrant, canEdit } from "@/utils/scripts/grants";
import Link from "next/link";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Page to edit grant with grantID as ID
export default function EditGrant({ params }: { params: { grantID: string } }) {
  const router = useRouter();
  const { toast } = useToast();
  const [showErrors, setShowErrors] = useState(false);

  const [grantID, setGrantID] = useState<number>(null);
  const [grantName, setGrantName] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [amount, setAmount] = useState<number>(null);
  const [deadline, setDeadline] = useState<Date>(null);
  const [organization, setOrganization] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRestriction = async () => {
      const editRestriction = await canEdit(+params.grantID);
      if (!editRestriction) {
        router.push("/dashboard/organization/grants");
        return;
      }
    };
    checkRestriction();

    const getData = async () => {
      const data = await getGrantInfo(+params.grantID);
      if (data === null || data.length === 0) {
        toast({
          variant: "destructive",
          title: "Grant does not exist",
        });
        router.push("/dashboard/organization/grants");
      }
      const grantData = data[0];
      setGrantID(grantData.id);
      setGrantName(grantData.name);
      setDescription(grantData.description);
      setRequirements(grantData.requirements);
      setAmount(grantData.amount);
      setDeadline(new Date(grantData.deadline.replace(/-/g, "/")));
      setOrganization(grantData.organizations.name);
      setLoading(false);
    };
    getData();
  }, []);

  const handleUpdate = async () => {
    if (
      grantName === "" ||
      description === "" ||
      amount === null ||
      amount <= 0 ||
      !deadline ||
      new Date() >= deadline ||
      !/^\d+$/.test(amount.toString())
    ) {
      setShowErrors(true);
      return;
    }
    setSubmitting(true);

    const error = await updateGrant(
      grantID,
      grantName,
      description,
      requirements,
      amount,
      deadline
    );
    if (error) {
      toast({
        variant: "destructive",
        title: "Unable to update grant",
        description: "Check log for error",
      });
      setSubmitting(false);
      location.reload();
      return;
    }

    toast({
      title: "Grant updated",
    });
    setSubmitting(false);
    router.push(`/dashboard/organization/grants/${grantID}`);
  };

  return (
    <div className="">
      <PageHeading header="Edit Grant" description="Edit your existing grant" />
      {/* New Grant Form */}
      {loading ? (
        <div className="text-center 2xl:mt-72 mt-52 text-darkmaroon">
          <div className="text-xl font-medium">Retrieving grant data</div>
          <div className="loadingAnimation">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          <Link
            href={`/dashboard/organization/grants/${params.grantID}`}
            className="flex items-center 2xl:mt-8 mt-6 2xl:text-lg"
          >
            <ChevronLeftIcon />
            Go back to view grant info
          </Link>
          <div className="border-2 border-gray-200 w-[50rem] rounded-lg mx-auto mt-8 py-8 px-16 bg-[#FFFEFE] animate-in shadow">
            <div className="flex flex-col items-center">
              <input
                className="inline-block border-b-2 border-body text-center bg-transparent py-1 px-2 text-2xl w-3/5"
                placeholder="Grant Name*"
                value={grantName}
                onChange={(e) => setGrantName(e.target.value)}
              />
              <div className="text-sm text-red-700 h-5">
                {showErrors && grantName === "" && "Field required"}
              </div>
            </div>

            <div className="text-body mb-1 mt-16">Description*</div>
            <textarea
              className="rounded-md py-2 px-3 min-h-32 w-full bg-slate-100"
              placeholder="Tell us about your grant"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="text-sm text-red-700 h-5">
              {showErrors && description === "" && "Field required"}
            </div>

            <div className="text-body mb-1 mt-6">Requirements</div>
            <textarea
              className="rounded-md py-2 px-3 min-h-32 w-full bg-slate-100"
              placeholder="Requirements for applicants"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />

            <div className="text-body mb-1 mt-6">Grant Amount*</div>
            <div className="relative">
              {/* User can't delete 0 when field is empty and ends up with leading 0. It's annoying and idk how to fix it without insanely janky code*/}
              <input
                className="rounded-md bg-slate-100 py-2 pl-6 pr-3"
                type="number"
                placeholder="Dollar Amount"
                value={amount}
                onChange={(e) => setAmount(+e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2">$</div>
            </div>
            <div className="text-sm text-red-700 h-5">
              {showErrors &&
                (amount === null
                  ? "Field required"
                  : amount <= 0
                  ? "Amount cannot be less than or equal to 0"
                  : !/^\d+$/.test(amount.toString()) &&
                    "Amount must be a whole number")}
            </div>

            <div className="text-body mb-1 mt-6">Deadline*</div>
            {/* Pop up calender */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal bg-slate-50 hover:bg-slate-100 border-slate-200",
                    !deadline && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {deadline ? (
                    format(deadline, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <div className="text-sm text-red-700 h-5">
              {deadline && new Date() >= deadline
                ? "Deadline must be after today's date"
                : showErrors && !deadline && "Field required"}
            </div>

            <div className="text-body mb-1 mt-6">Organization</div>
            <div className="text-heading">{organization}</div>

            <button
              className="block border-2 border-darkmaroon 2xl:text-lg text-darkmaroon hover:bg-darkmaroon/20 rounded-md py-1 px-2 mt-16 font-medium"
              onClick={() => handleUpdate()}
            >
              {submitting ? "Saving edit..." : "Save edit"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
