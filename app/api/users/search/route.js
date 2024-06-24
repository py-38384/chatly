import getCurrentUser from "@/app/actions/getCurrentUser"
import prisma from '@/app/libs/prismadb'
import { NextResponse } from "next/server"
export async function POST ( request ){
    try {
        const currentUser = await getCurrentUser()
        const body = await request.json()
        const { query } = body
        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', {status: 401})
        }
        //Search Query Execute  And Return Json
        const users = await prisma.user.findMany({
            where: {
                OR: [
                    {
                        email: {
                            contains: query
                        }
                    },
                    {
                        name: {
                            contains: query
                        }
                    }
                ],
                NOT: [
                    {
                        id: {
                            equals: currentUser.id
                        }
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                email: true,
                image: true,
            }
        })
        return NextResponse.json(users)
    } catch (error) {
        console.log(error)
        return new NextResponse('InternalError', { status: 500 })
    }
}