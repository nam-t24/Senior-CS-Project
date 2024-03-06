"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { createGrant } from "@/utils/scripts/grants";

import { useToast } from "@/components/ui/use-toast"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export default function CreateGrant() {
    const router = useRouter();
    const { toast } = useToast();
    const [showErrors, setShowErrors] = useState(false);

    const [grantName, setGrantName] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [amount, setAmount] = useState<number>(null);
    const [deadline, setDeadline] = useState<Date>(null);
    
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async () => {
        if(grantName==="" || description==="" || amount===null || amount<=0 || deadline===null || (new Date() >= deadline)){
            setShowErrors(true);
            return;
        }
        setSubmitting(true);

        const error = await createGrant(grantName, description, requirements, amount, deadline);
        if(error){
            toast({
            variant: "destructive",
            title: "Unable to create grant",
            description: "Check log for error",
            })
            setSubmitting(false);
            return;
        }

        toast({
            title: "Grant created",
        })
        setSubmitting(false);
        setTimeout(()=>{router.push('/dashboard/organization/grants')}, 500)
    }

    return (
      <div className="">
          <PageHeading header="Create Grant" description="Create a new grant for organizations to apply to"/>
          {/* New Grant Form */}
          <div className="border-[1px] border-gray-500 w-[50rem] rounded-lg mx-auto mt-8 py-8 px-16 bg-[#FFFEFE] animate-in">
                <div className="flex flex-col items-center">
                    <input className="inline-block border-b-2 border-body text-center bg-transparent py-1 px-2 text-2xl w-3/5" placeholder="Grant Name*" onChange={e=>setGrantName(e.target.value)}/>
                    <div className="text-sm text-red-700 h-5">{showErrors && grantName==="" && "Field required"}</div>

                </div>

                <div className="text-body mb-1 mt-16">
                    Description*
                </div>
                <textarea className="rounded-md py-2 px-3 min-h-32 w-full bg-slate-100" placeholder="Tell us about your grant" onChange={e=>setDescription(e.target.value)}/>
                <div className="text-sm text-red-700 h-5">{showErrors && description==="" &&"Field required"}</div>

                <div className="text-body mb-1 mt-6">
                    Requirements
                </div>
                <textarea className="rounded-md py-2 px-3 min-h-32 w-full bg-slate-100" placeholder="Any requirements orgs must meet to be able to apply" onChange={e=>setRequirements(e.target.value)}/>
                
                <div className="text-body mb-1 mt-6">
                    Grant Amount*
                </div>
                <div className="relative">
                    <input className="rounded-md bg-slate-100 py-2 pl-6 pr-3" type="number" placeholder="Dollar Amount" onChange={e=>setAmount(+e.target.value)}/>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">$</div>
                </div>
                <div className="text-sm text-red-700 h-5">{showErrors && (amount === null ? "Field required" : (amount <= 0  && "Amount cannot be less than or equal to 0"))}</div>

                <div className="text-body mb-1 mt-6">
                    Deadline*
                </div>
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
                        {deadline ? format(deadline, "PPP") : <span>Pick a date</span>}
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
                <div className="text-sm text-red-700 h-5">{deadline!==null && (new Date() >= deadline) ? "Deadline must be after today's date" :(showErrors && deadline===null && "Field required")}</div>

                <button className="block border-2 border-darkmaroon 2xl:text-lg text-darkmaroon hover:bg-darkmaroon/20 rounded-md py-1 px-2 mt-16" onClick={()=>handleSubmit()}>{submitting ? "Creating new grant..." : "Create New Grant"}</button>
          </div>
      </div>
    );
}