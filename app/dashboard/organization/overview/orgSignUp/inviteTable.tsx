import { useEffect, useState } from "react";
import CheckIcon from '@mui/icons-material/Check';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { acceptInvite, getInvitesOfUser, uninviteUser } from "@/utils/scripts/invites";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function TableRow({userID, name, email, orgID, inviteList}: {userID: string, name: string, email: string, orgID: number, inviteList: any[]}) {
    const router = useRouter();
    const { toast } = useToast();
    const [rejected, setRejected] = useState(false);

    const handleAccept = async() => {
        const error = await acceptInvite(userID, orgID);
        if(error){
            toast({
                variant: "destructive",
                title: "Unable to accept invite",
                description: "Check log for error",
            })
            return;
        }
        toast({
                title: "Invite accepted",
            })
        // Give time for supabase to update data before redirecting
        setTimeout(() => {location.reload(); router.push("/dashboard/organization/overview");}, 500)
    }

    const handleReject = async() => {
        const error = await uninviteUser(userID, orgID);
        if(error){
            toast({
                variant: "destructive",
                title: "Unable to reject invite",
                description: "Check log for error",
            })
            return;
        }
        toast({
                title: "Invite rejected",
            })
        setRejected(true);

        // remove invite from invite list
        inviteList.splice(inviteList.findIndex(invite => (invite.id === orgID)), 1);
    }

    return(
        <>
       {!rejected && <div className="flex py-4 px-6 hover:bg-neutral-50 hover:text-darkmaroon border-b-[1px] border-neutral-200">
            <div className="basis-80">{name}</div>
            <div className=" basis-96">{email}</div>
            <div className="basis-28 text-center ml-24">
                <DropdownMenu>
                    <DropdownMenuTrigger><MoreHorizIcon fontSize="medium"/></DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={()=>{handleAccept()}}>Accept Invite</DropdownMenuItem>
                        <DropdownMenuItem onClick={()=>{handleReject()}}>Reject Invite</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>}
        </>
    )
}
export default function InviteTable({userID} : {userID: string}){
    const [inviteList, setInviteList] = useState([]);

    useEffect(()=>{
        const getData = async() => {
            const invites = await getInvitesOfUser(userID);
            setInviteList(invites);
        }
        if(userID != ""){
            getData();
        }
    },[userID])

    return(
        <>
        {inviteList.length > 0 && <>
        <h1 className="text-2xl 2xl:mt-16 mt-12 mb-4">Invites</h1>
        <div className="w-[60rem] border-[1px] border-neutral-300 rounded-md shadow bg-white overflow-hidden">
            {/* Table header */}
            <div className="flex py-2 px-6 bg-neutral-100 rounded-t-md border-b-2 border-neautral-200 text-body text-sm">
                <div className="basis-80">Organization Name</div>
                <div className="basis-96">Organization Email</div>
                <div className="basis-28 text-center ml-24">Accept/Reject</div>
            </div>
            {/* Table rows */}
            <div className="max-h-[20rem] overflow-y-auto rounded-b-md ">
                {inviteList.map((org) => 
                    {return(<TableRow key={org.id} userID={userID} name={org.name} email={org.email} orgID={org.id} inviteList={inviteList}/>)}
                )}
            </div>
        </div>
        </>}
        </>
    )
}