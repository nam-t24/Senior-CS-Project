"use client";
import DonorHistory from "./donorHistory";
import NonProfitHistory from "./nonProfitHistory";
import { useState, useEffect } from "react";
import { getOrgType } from "@/utils/scripts/organization";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function OrganizationHistory() {
  const { toast } = useToast();
  const router = useRouter();

  const [isNonProfit, setIsNonProfit] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Get org type to display correct history type
    const getHistoryType = async () => {
      const orgType = await getOrgType();
      if (orgType === null) {
        toast({
          variant: "destructive",
          title: "Unable to get history",
          description: "Try again later and check log for error",
        });
        router.push("/dashboard/organization");
        return;
      }
      setIsNonProfit(orgType.isNonProfit);
      setLoading(false);
    };
    getHistoryType();
  }, []);

  return (
    <>
      {!loading &&
      (
        isNonProfit ? 
        <NonProfitHistory/> :
        <DonorHistory/>
      )
      }
    </>
  );
}
