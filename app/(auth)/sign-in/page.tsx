'use client'

import React from 'react'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputFields from "@/components/forms/InputFields";
import SelectFields from "@/components/forms/SelectFields";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import CountrySelectField from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";


const SignIn = () => {
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
            console.log(data)
        }catch (e){
            console.error(e)
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
