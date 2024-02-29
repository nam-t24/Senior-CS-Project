import TeamMemberCard from "@/components/dashboard/TeamMemberCard";

// Team section for org overview
export default function OrgTeam({orgTeam, isOwner}: {orgTeam: Array<any>, isOwner: boolean}) {
    
    return(
        <div className="w-[22rem] flex flex-col space-y-2 > * + *">
            {
                orgTeam.map((teamMember, index) => {
                    return <TeamMemberCard key={index} name={teamMember.full_name} email={teamMember.email} isOwner={isOwner} index={index}/>
                })
            }

        </div>
    );
}