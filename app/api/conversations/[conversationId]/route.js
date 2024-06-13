import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from '@/app/libs/prismadb'
import { pusherServer } from "@/app/libs/pusher"

export async function DELETE ( request, { params }){
    try {
        const { conversationId } = params
        const currentUser = await getCurrentUser()
        if( !currentUser?.id ){
            return new NextResponse('Unauthorized', { status: 401 })
        }
        const exisitingConversations = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                users: true
            }
        })

        if(!exisitingConversations){
            return new NextResponse('Invalid ID', { status: 400 })
        }

        const deletedConversation = await prisma.conversation.deleteMany({
            where: {
                id: conversationId,
                userIds: {
                    hasSome: [currentUser.id]
                }
            }
        })

        // exisitingConversations.users.forEach((user) => {
        //     if(user.email){
        //         pusherServer.trigger(user.email, 'conversation:remove', exisitingConversations)
        //     }
        // })

        exisitingConversations.users.forEach((user) => {
            if (user.email){
                pusherServer.trigger(user.email, 'conversation:remove', exisitingConversations)
            }
        })

        return NextResponse.json(deletedConversation)
    } catch (error) {
        return new NextResponse('Internal server error!', { status: 500 })
    }
}