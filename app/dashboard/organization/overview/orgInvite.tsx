import { useState } from "react"
import { addUserToOrgWithEmail } from "@/utils/scripts/organization";
import { useToast } from "@/components/ui/use-toast";

export default function OrgInvite({orgID}: {orgID: number}) {
    const { toast } = useToast();
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)

    const handleInvite = () => {
        if(email === ""){
            setError(true);
            return;
        }

        const inviteUser = async()=>{
            const errorMessage = await addUserToOrgWithEmail(email, orgID);
            if(errorMessage === "nonexistent email"){
                toast({
                    variant: "destructive",
                    title: "No account associated with given email",
                })
                return;
            }
            else if(errorMessage === "already in org"){
                toast({
                    variant: "destructive",
                    title: "Account is already in an organization",
                })
                return;
            }
            else if(errorMessage){
                toast({
                    variant: "destructive",
                    title: "Unable to invite user",
                    description: "Check log for error",
                })
                return
            }
            toast({
                title: "Successfully invited user",
            })
        }
        inviteUser();
    }

    return(
        <div className="mt-16">
            <div className="text-2xl">Invite Members</div>
            <div className="text-body">Enter the email associated with the account you want to invite</div>
            <div className="w-[35rem] border-b-[1px] border-body mt-2 mb-5"></div>
            <input className="border-[1px] border-body bg-transparent rounded-md px-2 py-1 w-[25rem]" placeholder="name@example.com" onChange={(e) => {setEmail(e.target.value)}}/>
            <div className="text-red-800 text-sm h-[1rem]">{error && email==="" ? "Email must not be empty" : ""}</div>
            <button className="border-2 border-darkmaroon px-3  text-darkmaroon rounded-md text-lg hover:bg-darkmaroon/20 transition duration-300 mt-3" onClick={()=>{handleInvite()}}>Invite user</button>
            {/* TODO delete this text once invite system is created */}
            <div className="mt-4 text-body">This is temporary text<br/>Invite user is currently set to immediately add to org for testing purposes.<br/>Once we create invite system then this will change to invites.<br/>Refresh page once you add user.</div>
        </div>
    )
}