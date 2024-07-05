import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from "@/app/libs/prismadb"

export async function POST ( request ){
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const { userId, objective } = body
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', {status: 401})
        }
        if(objective === 'request'){
            let updatedCurrentUser = currentUser
            const CurrentUserFriendRequestedIds = currentUser.friendRequestIds
            if (!CurrentUserFriendRequestedIds.includes(userId)){
                CurrentUserFriendRequestedIds.push(userId)
                updatedCurrentUser = await prisma.user.update({
                    where: {
                        id: currentUser.id
                    },
                    data: {
                        friendRequestIds: CurrentUserFriendRequestedIds
                    },
                })
            }
            const otherUser = await prisma.user.findUnique({
                where: {
                    id: userId
                },
            })
            let updatedOtherUser = otherUser
            const otherUserRequestFormIds = otherUser.friendRequestFromIds
            if(!otherUserRequestFormIds.includes(currentUser.id)){
                otherUserRequestFormIds.push(currentUser.id)
                updatedOtherUser = await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        friendRequestFromIds: otherUserRequestFormIds
                    }
                })
            }
            return NextResponse.json(updatedCurrentUser)
        }else if(objective === 'requestCancel'){
            let updatedCurrentUser = currentUser
            const CurrentUserFriendRequestedIds = currentUser.friendRequestIds
            if (CurrentUserFriendRequestedIds.includes(userId)){
                const updatedCurrentUserFriendRequestedIds = CurrentUserFriendRequestedIds.filter((item) => item !== userId)
                updatedCurrentUser = await prisma.user.update({
                    where: {
                        id: currentUser.id
                    },
                    data: {
                        friendRequestIds: updatedCurrentUserFriendRequestedIds
                    },
                })
            }
            const otherUser = await prisma.user.findUnique({
                where: {
                    id: userId
                },
            })
            let updatedOtherUser = otherUser
            const otherUserRequestFormIds = otherUser.friendRequestFromIds
            if(otherUserRequestFormIds.includes(currentUser.id)){
                const updatedOtherUserRequestFormIds = otherUserRequestFormIds.filter((item) => item !== currentUser.id)
                updatedOtherUser = await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        friendRequestFromIds: updatedOtherUserRequestFormIds
                    }
                })
            }
            console.log('Updated Current User -',updatedCurrentUser)
            console.log('Updated Array -',updatedCurrentUser.friendRequestIds)
            return NextResponse.json(updatedCurrentUser)
        }else if(objective === 'block'){
            let updatedCurrentUser = currentUser
            const currentUserBlockedIds = currentUser.blockedIds
            if(!currentUserBlockedIds.includes(userId)){
                currentUserBlockedIds.push(userId)
                updatedCurrentUser = await prisma.user.update({
                    where: {
                        id: currentUser.id
                    },
                    data: {
                        blockedIds: currentUserBlockedIds
                    }
                })
            }
            const otherUser = await prisma.user.findUnique({
                where: {
                    id: userId
                },
            })
            let updatedOtherUser = otherUser
            const otherUserBlockedByIds = otherUser.blockedByIds
            if(!otherUserBlockedByIds.includes(currentUser.id)){
                otherUserBlockedByIds.push(currentUser.id)
                updatedOtherUser = await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        blockedByIds: otherUserBlockedByIds
                    }
                })
            }
            return NextResponse.json(updatedOtherUser)
        }else if(objective === 'unblock'){
            let updatedCurrentUser = currentUser
            const currentUserblockedIds = currentUser.blockedIds
            if(currentUserblockedIds.includes(userId)){
                const updatedCurrentUserblockedIds = currentUserblockedIds.filter((item) => item !== userId)
                updatedCurrentUser = await prisma.user.update({
                    where: {
                        id: currentUser.id
                    },
                    data: {
                        blockedIds: updatedCurrentUserblockedIds
                    }
                })
            }
            const otherUser = await prisma.user.findUnique({
                where: {
                    id: userId
                },
            })
            let updatedOtherUser = otherUser
            const otherUserBlockedByIds = otherUser.blockedByIds
            if(otherUserBlockedByIds.includes(currentUser.id)){
                const updatedOtherUserBlockedByIds = otherUserBlockedByIds.filter((item) => item !== currentUser.id)
                updatedOtherUser = await prisma.user.update({
                    where: {
                        id: userId
                    },
                    data: {
                        blockedByIds: updatedOtherUserBlockedByIds
                    }
                })
            }
            return NextResponse.json(updatedOtherUser)
        }else{
            return new NextResponse('Invalid Request - Data missing', {status: 401})
        }
    } catch (error) {
        console.log(error)
        return new NextResponse('InternalError', { status: 500 })
    }
}