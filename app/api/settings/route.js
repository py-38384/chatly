import getCurrentUser from "@/app/actions/getCurrentUser"
import { NextResponse } from "next/server"
import prisma from '@/app/libs/prismadb'

export async function POST( request ){
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const {
            name,
            image
        } = body

        if(!currentUser?.id){
            return new NextResponse( 'Unauthorized', { status: 401 })
        }
        const updatedUser = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                name,
                image
            },
            select: {
                id: true,
                email: true,
                name: true,
                image: true,
            }
        })
        return NextResponse.json(updatedUser)
    } catch (error) {
        console.log(error)
        return new NextResponse('Internal Error', { status: 500 })
    }
}