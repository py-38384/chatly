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
        if(user.friendIds){
            const blockedIds = new Set(user?.blockedIds? user.blockedIds: [])
            blockedIds.add(otherUser.id)
            const updatedUser = await prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    friendIds: user.friendIds.filter((item) => item !== otherUser.id),
                    blockedIds: [...blockedIds]
                }
            })
            if(otherUser.friendIds){
                const blockedByIds = new Set(otherUser?.blockedByIds? otherUser.blockedByIds: [])
                blockedByIds.add(user.id)
                await prisma.user.update({
                    where: {
                        id: otherUser.id
                    },
                    data: {
                        friendIds: user.friendIds.filter((item) => item !== user.id),
                        blockedByIds: [...blockedByIds]
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