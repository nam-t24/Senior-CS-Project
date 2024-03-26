"use client";
import DonorHistory from "./donorHistory";
import NonProfitHistory from "./nonProfitHistory";
import { useState, useEffect } from "react";
import { getIDandOrgType } from "@/utils/scripts/organization";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function OrganizationHistory() {
  const { toast } = useToast();
  const router = useRouter();

  const [orgID, setOrgID] = useState<number>(null);
  const [isNonProfit, setIsNonProfit] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    // Get org type to display correct history type
    const getHistoryType = async () => {
      const IDandOrgType = await getIDandOrgType();
      if (IDandOrgType === null) {
        toast({
          variant: "destructive",
          title: "Unable to get history",
          description: "Try again later and check log for error",
        });
        router.push("/dashboard/organization");
        return;
      }
      setOrgID(IDandOrgType.id);
      setIsNonProfit(IDandOrgType.isNonProfit);
      setLoading(false);
    };
    getHistoryType();
  }, []);

  return (
    <>
      {!loading &&
      (
        isNonProfit ? 
        <NonProfitHistory orgID={orgID}/> :
        <DonorHistory orgID={orgID}/>
      )
      }
    </>
  );
}
