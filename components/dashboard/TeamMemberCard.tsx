import MoreVertIcon from '@mui/icons-material/MoreVert';
export default function TeamMemberCard({name, email, isOwner, index}: {name: string, email: string, isOwner: boolean, index: number}) {
    return(
        <div className="w-[22rem] rounded-md px-4 py-2 flex items-center justify-between bg-gray-200 hover:bg-gray-300">
            <div>
                <div className="flex items-center space-x-2 > * + * select-none">
                    <div>{name || ""}</div>
                    {index == 0 && <div className='text-xs bg-red-800/20 border-[1px] border-red-900 text-red-900 rounded-xl px-3'>Owner</div>}
                </div>
                <div className="text-body text-sm">{email}</div>

            </div>
            {isOwner && <button className='text-2xl'>
                <MoreVertIcon fontSize='inherit'/>
            </button>
}
        </div>
    )
}