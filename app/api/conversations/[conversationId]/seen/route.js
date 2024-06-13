import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from '@/app/libs/prismadb'
import { pusherServer } from "@/app/libs/pusher";

export async function POST(request, { params }){
    try {
        const currentUser = await getCurrentUser()
        const {conversationId} = params
        if(!currentUser.id || !currentUser.email){
            return new NextResponse('Unauthorized', {status: 401})
        }
        const conversation = await prisma.conversation.findUnique({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include: {
                        seen: true
                    }
                },
                users: true
            }
        })

        if(!conversation){
            return new NextResponse('Invalid Id', { status: 400 })
        }

        const lastMessage = conversation.messages[conversation.messages.length - 1]

        if(!lastMessage){
            return NextResponse.json(conversation)
        }

        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            select: {
                id: true,
                body: true,
                image: true,
                createdAt: true,
                sender: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    }
                },
                seen: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        image: true,
                    }
                },
            },
            data: {
                seen: {
                    connect: {
                        id: currentUser.id
                    }
                }
            }
        })
        await pusherServer.trigger(currentUser.email, 'conversation:update', {
            id: conversationId,
            messages: [updatedMessage]
        })

        if (lastMessage.seenIds.indexOf(currentUser.id) !== -1){
            return NextResponse.json(conversation)
        }

        await pusherServer.trigger(conversationId, 'message:update', updatedMessage)

        return NextResponse.json(updatedMessage)
    } catch (error) {
        return new NextResponse('Internal error', {status: 500})
    }
} 