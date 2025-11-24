'use client'

import React from 'react'
import {useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import InputFields from "@/components/forms/InputFields";
import SelectFields from "@/components/forms/SelectFields";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import CountrySelectField from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";


const SignUp = () => {
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
        fullName: '',
        email: '',
        password: '',
        country: 'US',
        investmentGoals: 'Growth',
        riskTolerance: 'Medium',
        preferredIndustry: 'Technology'
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
       <h1 className='form-title'>Sign Up & Personalize</h1>
           <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
           <InputFields
           name="fullName"
           label="Full Name"
           placeholder="John Doe"
           register={register}
           error={errors.fullName}
           validation={{required: 'Full name is required', minLength: 2}}
           />
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
               <CountrySelectField
               name="country"
               label="Select Country"
               control={control}
               required
               error={errors.country}
               />

               <SelectFields
               name="investmentGoals"
               label="Investment Goals"
               placeholder="Select investment goal"
               options={INVESTMENT_GOALS}
               control={control}
               error={errors.investmentGoals}
               required
               />

               <SelectFields
                   name="riskTolerance"
                   label="Risk Tolerance"
                   placeholder="Select risk level"
                   options={RISK_TOLERANCE_OPTIONS}
                   control={control}
                   error={errors.riskTolerance}
                   required
               />

               <SelectFields
                   name="preferredIndustry"
                   label="Preferred Industry"
                   placeholder="Select preferred industry"
                   options={PREFERRED_INDUSTRIES}
                   control={control}
                   error={errors.preferredIndustry}
                   required
               />

               <Button type="submit" disabled={isSubmitting} className='yellow-btn w-full mt-5'>
                   {isSubmitting ? 'Creating account' : 'Start Your Investing Journey' }
               </Button>
               <FooterLink text='Already have an account' linkText='Sign in' href='/sign-in'/>
           </form>
       </>
    )
}
export default SignUp
