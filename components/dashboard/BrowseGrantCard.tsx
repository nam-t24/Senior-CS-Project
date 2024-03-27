import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function BrowseGrantCard({
  id,
  name,
  amount,
  description,
  deadline,
}: {
  id: number;
  name: string;
  amount: number;
  description: string;
  deadline: string;
}) {
  const months = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December",
  };

  const date =
    months[deadline.slice(5, 7)] +
    " " +
    deadline.slice(8) +
    ", " +
    deadline.slice(0, 4);

  return (
    <div className="flex flex-col justify-between bg-[#FFFEFE] border-2 border-neutral-400 px-3 py-3 rounded-lg group hover:text-darkmaroon hover:border-darkmaroon transition duration-500 overflow-x-hidden">
      <div>
        <div className="xl:text-lg font-semibold">{name}</div>
        <div className="font-medium">${amount}</div>
        {/* Description */}
        <div className="text-body 2xl:text-sm text-xs mt-2 mb-1 min-h-[3.5rem] group-hover:text-darkmaroon xl:w-11/12">
          {description.length > 75
            ? description.slice(0, 75) + " ..."
            : description}
        </div>

        <div className="text-sm font-medium">Deadline: {date}</div>
      </div>
      <div>
        <Link
          href={`/dashboard/organization/grants/${id}`}
          className="inline-flex space-x-1 justify-center items-center bg-darkmaroon text-primary text-sm py-1 px-4 rounded-full mt-3 hoverRaise"
        >
          <p>Apply</p>
          <ChevronRightIcon fontSize="inherit" />
        </Link>
      </div>
    </div>
  );
}
