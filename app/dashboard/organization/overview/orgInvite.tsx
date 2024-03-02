import { useState, useEffect } from "react"
import { addUserToOrgWithEmail } from "@/utils/scripts/organization";
import { useToast } from "@/components/ui/use-toast";
import { inviteUser, uninviteUser, getInvitesOfOrg } from "@/utils/scripts/invites";
import { TableRow } from "@/components/dashboard/TableRow";

type inviteData = {
    id: string,
    full_name: string,
    email: string
}
export default function OrgInvite({orgID}: {orgID: number}) {
    const { toast } = useToast();
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    const [inviteList, setInviteList] = useState<Array<inviteData>>([]);

    const getInvites = async() => {
        const invites = await getInvitesOfOrg(orgID);
        setInviteList(invites)
    }

    useEffect(() => {
        getInvites();
    }, [])

    const handleInvite = async() => {
        if(email === ""){
            setError(true);
            return;
        }

        const errorMessage = await inviteUser(email, orgID);
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
            title: "Invited user to organization",
            description: "Have them accept from the 'Organization Overview' tab",
        })
        getInvites();
    }
    
    return(
        <div className="2xl:mt-20 mt-16">
            <div className="2xl:text-3xl text-2xl">Invite Users</div>
            <div className="text-body">Enter the email associated with the account you want to invite</div>
            <div className="w-[35rem] border-b-[1px] border-body mt-2 mb-5"></div>
            {/* Email input invite */}
            <input className="border-[1px] border-body bg-transparent rounded-md px-2 py-1 w-[25rem]" placeholder="name@example.com" onChange={(e) => {setEmail(e.target.value)}}/>
            <div className="text-red-800 text-sm h-[1rem]">{error && email==="" ? "Email must not be empty" : ""}</div>
            <button className="border-2 border-darkmaroon px-3 text-darkmaroon rounded-md 2xl:text-xl text-lg hover:bg-darkmaroon/20 transition duration-300 mt-3" onClick={()=>{handleInvite()}}>Invite user</button>

            {/* Invite Table */}
            {inviteList.length > 0 && 
            <>
                <div className="mt-12 mb-2 2xl:text-2xl text-xl">Invited Users</div>
                <div className="w-[60rem] border-[1px] border-neutral-300 rounded-md shadow bg-white overflow-hidden">
                    {/* Table header */}
                    <div className="flex py-2 px-6 bg-neutral-100 rounded-t-md border-b-2 border-neautral-200 text-body text-sm">
                        <div className="basis-80">Name</div>
                        <div className="basis-96">Email</div>
                        <div className="basis-24 text-center ml-24">Uninvite</div>
                    </div>
                    {/* Table rows */}
                    <div className="max-h-[20rem] overflow-y-auto rounded-b-md ">
                        {inviteList.map((profile) => 
                            {return(<TableRow key={profile.id} userUUID={profile.id} name={profile.full_name} email={profile.email} orgID={orgID}/>)}
                        )}
                    </div>
                </div>
            </>}            
        </div>
    )
}