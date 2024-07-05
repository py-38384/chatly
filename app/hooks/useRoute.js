import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { HiChat } from 'react-icons/hi'
import { HiArrowLeftOnRectangle, HiUsers } from 'react-icons/hi2'
import { FaGlobeAmericas } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { signOut } from "next-auth/react"
import useConversation from "./useConversation"

export const useDeskTopRoutes = () => {
    const pathname = usePathname()
    const { conversationId } = useConversation()

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId
        },
        {
            label: 'Friends',
            href: '/friends',
            icon: HiUsers,
            active: pathname === '/friends'
        },
        {
            label: 'Global',
            href: '/global',
            icon: FaGlobeAmericas,
            active: pathname === '/global'
        },
        {
            label: 'Logout',
            href: '#',
            onClick: () => signOut(),
            icon: HiArrowLeftOnRectangle,
            active: false
        }
    ], [pathname, conversationId])
    return routes
}

export const useMobileRoutes = () => {
    const pathname = usePathname()
    const { conversationId } = useConversation()

    const routes = useMemo(() => [
        {
            label: 'Chat',
            href: '/conversations',
            icon: HiChat,
            active: pathname === '/conversations' || !!conversationId
        },
        {
            label: 'Friends',
            href: '/friends',
            icon: HiUsers,
            active: pathname === '/friends'
        },
        {
            label: 'Global',
            href: '/global',
            icon: FaGlobeAmericas,
            active: pathname === '/global'
        },
        {
            label: 'Account',
            href: '/account',
            icon: RiAccountCircleFill,
            active: pathname === '/account'
        }
    ], [pathname, conversationId])
    return routes
}