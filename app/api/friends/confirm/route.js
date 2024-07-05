import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from '@/app/libs/prismadb'
import { NextResponse } from "next/server"
export async function POST ( request ) {
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const { userId } = body
        if( !currentUser?.id || !currentUser?.email ){
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const user = await prisma.user.findUnique({
            where: {
                id: currentUser.id
            }
        })
        const otherUser = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if(user.friendRequestFromIds){
            const friendIds = new Set(user.friendIds? user.friendIds: [])
            friendIds.add(otherUser.id)
            const updatedUser = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    friendRequestFromIds: user.friendRequestFromIds.filter((item) => item !== otherUser.id),
                    friendIds: [...friendIds]
                }
            })
            if(otherUser.friendRequestIds){
                const friendIds = new Set(otherUser?.friendIds? otherUser.friendIds: [])
                friendIds.add(user.id)
                await prisma.user.update({
                    where: {
                        id: otherUser.id
                    },
                    data: {
                        friendRequestIds: otherUser.friendRequestIds.filter((item) => item !== user.id),
                        friendIds: [...friendIds]
                    }
                })
            }
            return NextResponse.json(updatedUser)
        }
        return NextResponse.json(user)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Error', {status: 500})
    }
}