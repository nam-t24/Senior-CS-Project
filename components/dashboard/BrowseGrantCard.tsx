import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { formatDate } from "@/utils/helperFunctions";

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
  return (
    <div className="flex flex-col justify-between bg-[#FFFEFE] border-2 border-neutral-400 px-3 py-3 rounded-lg group hover:text-darkmaroon hover:border-darkmaroon transition duration-500 overflow-x-hidden">
      <div>
        <div className="xl:text-lg font-semibold">{name}</div>
        <div className="font-medium">${amount}</div>
        {/* Description */}
        <div className="text-body 2xl:text-sm text-xs mt-2 mb-1 min-h-[3.5rem] group-hover:text-darkmaroon xl:w-11/12">
          {description.length > 75
            ? description.slice(0, 75) + "..."
            : description}
        </div>

        <div className="text-sm font-medium">Deadline: {formatDate(deadline)}</div>
      </div>
      <div>
        {/* TODO Redireect user to actual application page when we get to the application feature */}
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
