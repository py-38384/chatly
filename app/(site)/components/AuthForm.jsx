'use client'

import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import Input from "@/app/components/input/Input"
import Button from "@/app/components/Button"
import AuthSocialButton from "./AuthSocialButton"
import Image from "next/image"
import { BsGithub, BsGoogle } from 'react-icons/bs'
import axios from "axios"
import toast from "react-hot-toast"
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from "next/navigation"

const AuthForm = () => {
    const session = useSession()
    const router = useRouter()
    const [variant, setVariant] = useState('LOGIN')
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(session?.status === 'authenticated'){
            router.push('/conversations')
        }
    }, [session?.status, router])

    const toggleVariant = useCallback(() => {
        if (variant === 'LOGIN') {
            setVariant('REGISTER')
        } else {
            setVariant('LOGIN')
        }
    }, [variant])

    const { register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data) => {
        setIsLoading(true)
        if (variant === 'REGISTER') {
            await axios.post('/api/register', data)
            .then(() => {
                signIn('credentials', data)
                toast.success('Account create successful.')
            })
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
        }

        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error) {
                    toast.error('Invaild credentials')
                }
                if(callback?.ok && !callback?.error){
                    router.push('/conversations')
                }
            })
            .finally(() => setIsLoading(false))
        }   
    }

    const socialAction = (action) => {
        setIsLoading(true)
        signIn(action, { redirect: false })
        .then((callback) => {
            if(callback?.error) {
                toast.error('Invaild credentials')
            }
            if(callback?.ok && !callback?.error){
                toast.success('Logged in!')
            }
        })
    }

    return (
        <>
            <div className="sm:mx-auto sm:w-full sm:max-w-md flex items-center justify-center flex-col">
                <Image width={88} height={88} src={'/favicon.ico'} alt="LOGO" className="" />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-bold text-gray-900">{variant === 'LOGIN'? 'Sign in to your account': 'Sign up to your account'}</h2>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    <form 
                        className="space-y-6" 
                        onSubmit={handleSubmit(onSubmit)}
                    >
                    {variant === 'REGISTER' && (
                    <Input 
                            id="name" 
                            label="Name" 
                            register={register} 
                            errors={errors}
                            disabled={isLoading}
                        />  
                    )}
                        <Input 
                            id="email" 
                            type="email"
                            label="Email" 
                            register={register} 
                            errors={errors}
                            disabled={isLoading}
                        />  

                        <Input 
                            id="password" 
                            type="password"
                            label="Password" 
                            register={register} 
                            errors={errors}
                            disabled={isLoading}
                        />       
                        <div>
                            <Button
                                disabled={isLoading}
                                fullWidth
                                type="submit"
                            >{variant === 'LOGIN' ? 'Sign in': 'Register'}</Button>
                        </div>  
                    </form>
                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"/>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-2 text-gray-500">Or continue with</span>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-2">
                            <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')}/>
                            <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')}/>
                        </div>
                    </div>
                    <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                        <div>
                            {variant === 'LOGIN' ? 'New to Chatly?' : 'Already have an account?'}
                        </div>
                        <div onClick={toggleVariant} className="underline cursor-pointer">
                            {variant === 'LOGIN' ? 'SignUp' : 'Login'}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AuthForm