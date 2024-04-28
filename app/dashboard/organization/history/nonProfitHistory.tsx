"use client"
import PageHeading from "@/components/dashboard/PageHeading";
import { useState, useEffect } from "react";
import { getGrantsReceivedByOrgID } from "@/utils/scripts/grants";
import { useToast } from "@/components/ui/use-toast";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Link from "next/link";

export default function NonProfitHistory({orgID} : {orgID: number}) {
  const { toast } = useToast();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [grantList, setGrantList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  // Grant list filters
  const [nameFilter, setNameFilter] = useState(false);
  const [nameLeastToGreatest, setNameLeastToGreatest] = useState(false);
  const [amountFilter, setAmountFilter] = useState(false);
  const [amountLeastToGreatest, setAmountLeastToGreatest] = useState(false);
  const [dateFilter, setDateFilter] = useState(false);
  const [dateLeastToGreatest, setDateLeastToGreatest] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await getGrantsReceivedByOrgID(orgID);

      if (data === null) {
        toast({
          variant: "destructive",
          title: "Unable to retrieve grants",
          description: "Reload page or check another time",
        });
        setLoading(false);
        setError(true);
        return;
      }
      setGrantList(data);

      var total = 0;
      for (const grant of data) {
        total += grant.amount;
      }
      setTotalAmount(total);

      setLoading(false);
    };
    getData();
  }, []);

  // Sorting functions
  const handleNameSort = () => {
    // Resetting other filters
    setNameFilter(true);
    setAmountFilter(false);
    setAmountLeastToGreatest(false);
    setDateFilter(false);
    setDateLeastToGreatest(false);
    // Sort
    if (nameLeastToGreatest) {
      let sortedArray = grantList;
      sortedArray.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
      setGrantList(sortedArray);
    } else {
      let sortedArray = grantList;
      sortedArray.sort((a, b) =>
        b.name > a.name ? 1 : a.name > b.name ? -1 : 0
      );
      setGrantList(sortedArray);
    }
    setNameLeastToGreatest(!nameLeastToGreatest);
  };

  const handleAmountSort = () => {
    // Resetting other filters
    setAmountFilter(true);
    setNameFilter(false);
    setNameLeastToGreatest(false);
    setDateFilter(false);
    setDateLeastToGreatest(false);
    // Sort
    if (amountLeastToGreatest) {
      let sortedArray = grantList;
      sortedArray.sort((a, b) => a.amount - b.amount);
      setGrantList(sortedArray);
    } else {
      let sortedArray = grantList;
      sortedArray.sort((a, b) => b.amount - a.amount);
      setGrantList(sortedArray);
    }
    setAmountLeastToGreatest(!amountLeastToGreatest);
  };

  const handleDateSort = () => {
    // Resetting other filters
    setDateFilter(true);
    setNameFilter(false);
    setNameLeastToGreatest(false);
    setAmountFilter(false);
    setAmountLeastToGreatest(false);
    // Sort
    if (dateLeastToGreatest) {
      let sortedArray = grantList;
      sortedArray.sort((a, b) =>
        new Date(a.dateAccepted) > new Date(b.dateAccepted)
          ? 1
          : new Date(b.dateAccepted) > new Date(a.dateAccepted)
          ? -1
          : 0
      );
      setGrantList(sortedArray);
    } else {
      let sortedArray = grantList;
      sortedArray.sort((a, b) =>
        new Date(b.dateAccepted) > new Date(a.dateAccepted)
          ? 1
          : new Date(a.dateAccepted) > new Date(b.dateAccepted)
          ? -1
          : 0
      );
      setGrantList(sortedArray);
    }
    setDateLeastToGreatest(!dateLeastToGreatest);
  };

  // Row component for table
  function TableRow({
    id,
    name,
    amount,
    orgDonor,
    date,
  }: {
    id: number;
    name: string;
    amount: number;
    orgDonor: { name: string } | null;
    date: string;
  }) {
    const dateString =
      date.slice(5, 7) + "/" + date.slice(8) + "/" + date.slice(0, 4);
    return (
      <Link
        href={`/dashboard/organization/history/closedGrant/${id}`}
        className="flex py-4 px-6 even:bg-white odd:bg-gray-100 hover:bg-gray-200 2xl:text-base text-sm"
      >
        <div className="basis-1/3 truncate">{name}</div>
        <div className="basis-1/6">${amount}</div>
        <div className="basis-1/4 truncate">{orgDonor.name}</div>
        <div className="basis-1/4">{dateString}</div>
      </Link>
    );
  }

  return (
    <div>
      <PageHeading
        header="Grant History"
        description="History of previous grants received"
      />
      {loading ? (
        <div className="text-center 2xl:mt-72 mt-52 text-darkmaroon">
          <div className="text-xl font-medium">Retrieving grants</div>
          <div className="loadingAnimation">
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      ) : (
        <>
          {error ? (
            // Unable to retrieve grants from database
            <div className="mt-8 text-center">
              There was an error retrieving grant history. Reload or try again
              later.
            </div>
          ) : (
            // Main section
            <div className="2xl:mt-16 mt-8 2xl:w-[70rem] w-[60rem] mx-auto">
              {/* History Table */}
              <div className="border-2 border-neutral-400 rounded-md overflow-hidden">
                {/* Heading */}
                <div className="flex py-2 px-6 font-medium text-lg border-b-2 border-neutral-400 bg-white items-center">
                  {/* Name section */}
                  <div className="basis-1/3 flex items-center space-x-2">
                    <div>Name</div>
                    <button onClick={() => handleNameSort()}>
                      {!nameFilter ? (
                        <UnfoldMoreIcon fontSize="inherit" />
                      ) : nameLeastToGreatest ? (
                        <ExpandMoreIcon fontSize="inherit" />
                      ) : (
                        <ExpandLessIcon fontSize="inherit" />
                      )}
                    </button>
                  </div>
                  {/* Amount section */}
                  <div className="basis-1/6 flex items-center space-x-2">
                    <div>Amount</div>{" "}
                    <button onClick={() => handleAmountSort()}>
                      {!amountFilter ? (
                        <UnfoldMoreIcon fontSize="inherit" />
                      ) : amountLeastToGreatest ? (
                        <ExpandMoreIcon fontSize="inherit" />
                      ) : (
                        <ExpandLessIcon fontSize="inherit" />
                      )}
                    </button>
                  </div>
                  {/* Org funded section */}
                  <div className="basis-1/4">Grant Owner</div>
                  {/* Date section */}
                  <div className="basis-1/4 flex items-center space-x-2">
                    <div>Date Accepted</div>
                    <button onClick={() => handleDateSort()}>
                      {!dateFilter ? (
                        <UnfoldMoreIcon fontSize="inherit" />
                      ) : dateLeastToGreatest ? (
                        <ExpandMoreIcon fontSize="inherit" />
                      ) : (
                        <ExpandLessIcon fontSize="inherit" />
                      )}
                    </button>
                  </div>
                </div>
                {/* End Heading */}

                {/* Table Rows */}
                <div className="2xl:min-h-[35rem] 2xl:max-h-[35rem] min-h-[25rem] max-h-[25rem] overflow-y-auto">
                  {grantList.map((grant) => {
                    return (
                      <TableRow
                        key={grant.id}
                        id={grant.id}
                        name={grant.name}
                        amount={grant.amount}
                        orgDonor={grant.ownerOrgName}
                        date={grant.acceptedDate}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-around 2xl:mt-16 mt-10">
                {/* Total grants */}
                <div className="text-center">
                  <div className="text-5xl font-semibold text-maroon">
                    {grantList.length}
                  </div>
                  <div className="text-lg mt-2 font-light">
                    Total Grants Received
                  </div>
                </div>
                {/* Total amount received */}
                <div className="text-center">
                  <div className="text-5xl font-semibold text-maroon">
                    ${totalAmount}
                  </div>
                  <div className="text-lg mt-2 font-light">Amount Received</div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
