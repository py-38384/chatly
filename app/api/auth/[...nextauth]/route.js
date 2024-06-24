import bcrypt from 'bcrypt'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '@/app/libs/prismadb'

const setUserProvider = async (user, provider) => {
    if( provider === 'local' ){
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                provider: provider,
            }
        })
    } else {
        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                provider: provider,
                emailVerified: true,
            }
        })
    }
}

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Invalid Credentials')
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })
                if (!user || !user?.hashedPassword) {
                    throw new Error('Invaild credentials')
                }
                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)
                if (!isCorrectPassword) {
                    throw new Error('Invalid credentials')
                }
                return user
            }
        })
    ],
    events:{
        signIn: async ({ user, account, profile, isNewUser }) => {
            if(isNewUser){
                if(account){
                    if(account?.provider == 'google'){
                        setUserProvider(user, account.provider)
                    }else if(account?.provider == 'github'){
                        setUserProvider(user, account.provider)
                    }else{
                        setUserProvider(user, 'local')
                    }
                }else{
                    setUserProvider(user, 'local')
                }
            }
            // console.log('Is new user -',isNewUser)
            // console.log('User -',user)
            // console.log('Account -',account)
            // console.log('Profile -',profile)
        }
    },
    debug: process.env.NODE_ENV === 'development',
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }