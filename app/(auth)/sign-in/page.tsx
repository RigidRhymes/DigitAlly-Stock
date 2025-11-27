'use client'

import React from 'react'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputFields from "@/components/forms/InputFields";
import FooterLink from "@/components/forms/FooterLink";
import {signInWithEmail} from "@/lib/actions/auth.actions";
import {useRouter} from "next/navigation";
import {toast} from "sonner";


const SignIn = () => {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur'
    })

    const onSubmit = async (data: SignInFormData) => {


        try {
           const result = await signInWithEmail(data)

            if(result.success) router.push('/')
        }catch (e){
            console.error(e)
            toast.error('Sign in failed. Please try again.', {
                description: e instanceof Error ? e.message : 'Failed to sign in'
            })
        }
    }

    return (
        <>
            <h1 className='form-title'>Log In to Your Account</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
                <InputFields
                    name="email"
                    label="Email"
                    placeholder="allmic@digitally"
                    register={register}
                    error={errors.email}
                    validation={{required: 'Email is required', pattern: {value: /^\S+@\S+$/i}, message: 'Invalid email address'}}
                />
                <InputFields
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    register={register}
                    error={errors.password}
                    type="password"
                    validation={{required: 'Password is required', minLength: 9}}
                />

                <Button type="submit" disabled={isSubmitting} className='yellow-btn w-full mt-5'>
                    {isSubmitting ? 'Signing In...' : 'Log in to your Account' }
                </Button>
                <FooterLink text='No Account Yet?' linkText='Sign Up' href='/sign-up'/>
            </form>
        </>
    )
}
export default SignIn
