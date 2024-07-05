import prisma from '@/app/libs/prismadb'
import getSession from './getSession'

const getFriendRequests = async () => {
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
            orderBy: {
                createdAt: 'desc',
            },
            where: {
                id: {
                    in: user.friendRequestFromIds
                },
                email: {
                    not: session.user.email
                },
            }
        })

        return users
    } catch (error) {
        return []
    }
}

export default getFriendRequests