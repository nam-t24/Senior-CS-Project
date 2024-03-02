import { uninviteUser } from "@/utils/scripts/invites";
import { useToast } from "@/components/ui/use-toast";
import ClearIcon from '@mui/icons-material/Clear';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";

// For table row in invites table under organization overview
export const TableRow = ({userUUID, name, email, orgID}: {userUUID: string, name: string, email: string, orgID: number}) => {
    const { toast } = useToast();
    const [uninvited, setUninvited] = useState(false);

    const handleUninvite = async(userID: string, orgID: number)=>{
        const error = await uninviteUser(userID, orgID);
        if(error){
            toast({
                variant: "destructive",
                title: "Unable to uninvite user",
                description: "Check log for error",
            })
            return
        }
        toast({
            title: "User uninvited",
        })
        setUninvited(true);
    }
    return(
        <>
        {!uninvited && <div className="flex py-4 px-6 hover:bg-neutral-50 hover:text-darkmaroon border-b-[1px] border-neutral-200">
            <div className="basis-80">{name}</div>
            <div className=" basis-96">{email}</div>
            <div className="basis-24 text-center ml-24">
                <DropdownMenu>
                    <DropdownMenuTrigger><ClearIcon fontSize="inherit"/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={()=>{handleUninvite(userUUID, orgID)}}>Remove Invite</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>}
        </>
    )
}