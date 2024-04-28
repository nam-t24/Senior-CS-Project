import TeamMemberCard from "@/components/dashboard/TeamMemberCard";
import { useState,useEffect } from "react";
import MoreVertIcon from '@mui/icons-material/MoreVert';


// Team section for org overview
export default function OrgTeam({userUUID, orgTeam, admins, isOwner, orgID}: {userUUID: string, orgTeam: Array<any>, admins: Array<string>, isOwner: boolean, orgID: number}) {

    const checkIsAdmin = () => {
        if(admins.includes(userUUID)){
            return true;
        }
        return false;
    }

    function TeamCardLoading() {
        return(
            <div className="w-full rounded-md px-4 py-3 flex items-center justify-between bg-gray-100">
                <div>
                    <div className="2xl:w-[8rem] w-[6rem] h-[1rem] rounded-lg bg-gray-200 mb-2"></div>
                    <div className="2xl:w-[13rem] w-[10rem] h-[1rem] rounded-lg bg-gray-200"></div>

                </div>
                <button className='text-2xl outline-none focus:outline-none text-neutral-400'>
                        <MoreVertIcon fontSize='inherit'/>
                </button>
            </div>
        );
    }

    return(
        <>
        {orgTeam.length === 0 ? 
        <div className="2xl:w-[25rem] w-[22rem] flex flex-col space-y-2">
            <TeamCardLoading/>
            <TeamCardLoading/>
            <TeamCardLoading/>
        </div>
        : 
        <div className="2xl:w-[25rem] w-[22rem] flex flex-col space-y-2 animate-in">
            {
                orgTeam.map((teamMember, index) => {
                    return <TeamMemberCard key={index} memberInfo={teamMember} isOwner={isOwner} isAdmin={checkIsAdmin()} index={index} numOfAdmins={admins.length} orgID={orgID}/>
                })
            }

        </div>}
        </>
    );
}