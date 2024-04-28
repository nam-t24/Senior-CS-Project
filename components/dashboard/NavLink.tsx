import { usePathname } from 'next/navigation'
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
import SubjectIcon from '@mui/icons-material/Subject';
import PostAddIcon from '@mui/icons-material/PostAdd';
import TimelineIcon from '@mui/icons-material/Timeline';
import TopicIcon from '@mui/icons-material/Topic';
import SearchIcon from '@mui/icons-material/Search';
import ErrorIcon from '@mui/icons-material/Error';

// href: link to route user to
// exact: if true, check if current url path matches exactly like href
// if false, checks if path name only starts with href
// activeOptions: css that will activate if path matches href
export default function NavLink ({ href, exact, activeOptions, className, notification, children }: { href: string, exact: boolean, activeOptions: string, className: string, notification?:boolean, children: string}) {

    const icons = {
        "Profile": <PersonIcon fontSize='inherit'/>,
        "Overview": <SubjectIcon fontSize='inherit'/>,
        "Grants": <PostAddIcon fontSize='inherit'/>,
        "Applications": <PostAddIcon fontSize='inherit'/>,
        "History": <TimelineIcon fontSize='inherit'/>,
        "Open Grants": <TopicIcon fontSize='inherit'/>,
        "Search": <SearchIcon fontSize='inherit'/>,
    }

    const pathname = usePathname();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        className += " " + activeOptions;
    }

    return(
        <Link href={href}>
            <div className={`${className} flex items-center justify-between`}>
                <div className='flex items-center 2xl:gap-x-6 gap-x-4'>
                    {children in icons ? icons[children]: {}}
                    {children}
                </div>
                {notification && <ErrorIcon fontSize='inherit'/>}
            </div>
        </Link>
    )
}