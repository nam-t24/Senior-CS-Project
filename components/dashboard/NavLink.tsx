import { usePathname } from 'next/navigation'
import Link from 'next/link';

// href: link to route user to
// exact: if true, check if current url path matches exactly like href
// if false, checks if path name only starts with href
// activeOptions: css that will activate if path matches href
export default function NavLink ({ href, exact, activeOptions, className, children }: { href: string, exact: boolean, activeOptions: string, className: string, children: string}) {
    const pathname = usePathname();
    const isActive = exact ? pathname === href : pathname.startsWith(href);

    if (isActive) {
        className += " " + activeOptions;
    }

    return(
        <Link href={href}>
            <div className={className}>{children}</div>
        </Link>
    )
}