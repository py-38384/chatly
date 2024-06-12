import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { User } from '@prisma/client'
import { getServerSession } from "next-auth";

const useOtherUser = ({ users }) => {
    const session = useSession()
    const otherUser = useMemo(() => {
        const currentUserEmail = session?.data?.user?.email
        const otherUsers = users.filter((user) => user.email !== currentUserEmail)
        return otherUsers[0]
    }, [session?.data?.user?.email, users])

    return otherUser
}

export default useOtherUser