'use client'
import Link from "next/link"

const DesktopItem = ({ label, icon:Icon, href, onClick, active }) => {
    const handleClick = () => {
        if (onClick) {
            return onClick()
        }
    }
  return (
    <li onClick={handleClick}>
        <Link href={href} className={`
            group 
            flex 
            gap-x-3 
            rounded-md 
            p-3 
            text-sm 
            leading-6 
            font-semibold
            text-gray-500
            hover:text-black 
            hover:bg-[#f9f4f2] 
            ${active && 'bg-[#f9f4f2] text-black'}`
        }>
            <Icon className="h-6 w-6 shrink-0"/>
            <span className="sr-only">{label}</span>
        </Link>
    </li>
  )
}

export default DesktopItem