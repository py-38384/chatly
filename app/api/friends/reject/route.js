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
            console.log(user.friendRequestFromIds)
            const updatedUser = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    friendRequestFromIds: user.friendRequestFromIds.filter((item) => item !== otherUser.id)
                }
            })
            if(otherUser.friendRequestIds){
                await prisma.user.update({
                    where: {
                        id: otherUser.id
                    },
                    data: {
                        friendRequestIds: otherUser.friendRequestIds.filter((item) => item !== user.id)
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