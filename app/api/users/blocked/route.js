import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from '@/app/libs/prismadb'
import { NextResponse } from "next/server"
export async function POST ( request ){
    try {
        const currentUser = await getCurrentUser()
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', {status: 401})
        }
        console.log(currentUser)
        return NextResponse.json(currentUser.blockedIds)
    } catch (error) {
        console.log(error)
        return new NextResponse('InternalError', { status: 500 })
    }
}