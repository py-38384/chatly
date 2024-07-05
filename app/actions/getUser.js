import prisma from '@/app/libs/prismadb'
import getSession from './getSession'

const getUsers = async () => {
    const session = await getSession()
    if(!session?.user?.email){
        return []
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email
            }
        })
        const users = await prisma.user.findMany({
            where: {
                id: {
                    notIn: user.blockedIds,
                },
                id: {
                    notIn: user.friendIds
                },
                email: {
                    not: session.user.email
                },
            }
        })

        return users.filter((item) => {
            if(item.blockedIds.includes(user.id)){
                return false
            }
            return true
        })
    } catch (error) {
        return []
    }
}

export default getUsers