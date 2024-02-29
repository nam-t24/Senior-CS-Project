import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/components/ui/use-toast";
import { makeUserAdmin, demoteAdmin, removeMember, changeOwners } from '@/utils/scripts/team'
import { useEffect, useState } from 'react';

type MemberInfo = {
    full_name: string | null;
    email: string;
    id: string;
}

// the isOwner and isAdmin props refer to the current user, you, not the member of this current card
export default function TeamMemberCard({memberInfo, isOwner, isAdmin, index, numOfAdmins, orgID}: {memberInfo: MemberInfo, isOwner: boolean, isAdmin: boolean, index: number, numOfAdmins: number, orgID: number}) {
    const { toast } = useToast();
    const [memberIsAdmin, setMemberIsAdmin] = useState(false);
    const [userKicked, setUserKicked] = useState(false);

    useEffect(() => {
        if((index > 0 && index <= numOfAdmins)){
            setMemberIsAdmin(true)
        }
    }, [])

    const makeAdmin = () => {
        const handleNewAdmin = async() =>{
            const error = await makeUserAdmin(memberInfo.id, orgID);
            if(error){
                toast({
                    variant: "destructive",
                    title: "Unable to make user admin",
                    description: "Check log for error",
                })
                return;
            }
            setMemberIsAdmin(true);
            toast({
                title: "Successfully made user admin",
            })

        }
        handleNewAdmin();
    }

    const demoteUserAdmin = () => {
        const handleDemoteAdmin = async() =>{
            const error = await demoteAdmin(memberInfo.id, orgID);
            if(error){
                toast({
                    variant: "destructive",
                    title: "Unable to make user admin",
                    description: "Check log for error",
                })
                return;
            }
            setMemberIsAdmin(false);
            toast({
                title: "Successfully demoted user",
            })
        }
        handleDemoteAdmin();
    }

    const kickUser = () => {
        const handleKickUser = async() =>{
            const error = await removeMember(memberInfo.id, orgID);
            if(error){
                toast({
                    variant: "destructive",
                    title: "Unable to kick user",
                    description: "Check log for error",
                })
                return;
            }
            setUserKicked(true);
            toast({
                title: "Successfully kicked user",
            })
        }
        handleKickUser();
    }

    const transferOwnership = () => {
        const handleTransferOwnership = async () => {
            const error = await changeOwners(memberInfo.id, orgID);
            if(error){
                toast({
                    variant: "destructive",
                    title: "Unable to transfer ownership",
                    description: "Check log for error",
                })
                return;
            }
            toast({
                title: "Successfully transferred ownership",
            })
            // Must reload page since user no long can have access to any owner functionalities
            location.reload();
        }
        handleTransferOwnership();
    }
    
    return(
        <>
        {!userKicked && <div className="w-[22rem] rounded-md px-4 py-2 flex items-center justify-between bg-gray-200 hover:bg-gray-300">
            <div>
                <div className="flex items-center space-x-2 select-none">
                    <div>{memberInfo.full_name || ""}</div>
                    {index === 0 && <div className='text-xs bg-red-800/20 border-[1px] border-red-900 text-red-900 rounded-xl px-3'>Owner</div>}
                    {memberIsAdmin && <div className='text-xs bg-red-800/20 border-[1px] border-red-900 text-red-900 rounded-xl px-3'>Admin</div>}
                </div>
                <div className="text-body text-sm">{memberInfo.email}</div>

            </div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className='text-2xl outline-none focus:outline-none'>
                        <MoreVertIcon fontSize='inherit'/>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {navigator.clipboard.writeText(memberInfo.email)}}>Copy Email</DropdownMenuItem>

                    {(isOwner || isAdmin) && 
                        <>
                        {index !== 0 && <DropdownMenuSeparator/>}
                        {index !== 0 && !memberIsAdmin && <DropdownMenuItem onClick={() => makeAdmin()}>Make Admin</DropdownMenuItem>}
                        {memberIsAdmin && <DropdownMenuItem onClick={() => demoteUserAdmin()}>Demote Member</DropdownMenuItem>}
                        {index !== 0 && <DropdownMenuItem onClick={() => kickUser()}>Kick Member</DropdownMenuItem>}
                        {index !== 0 && isOwner && <DropdownMenuSeparator/>}
                        {index !== 0 && isOwner && <DropdownMenuItem onClick={() => transferOwnership()}>Transfer Ownership</DropdownMenuItem>}
                        </>
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </div>}
        </>
    )
}