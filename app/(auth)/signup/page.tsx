import Image from "next/image"
import Link from "next/link"

import SignInWithGoogle from "@/components/auth/SignInWithGoogle"
import SignInWithFacebook from "@/components/auth/SignInWithFacebook"
import ArrowRightIcon from "@/components/icons/ArrowRight"
import SignUpForm from "@/components/forms/SignUpForm"


import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Sign up",
  description: "Join to Laascaanood Public Library"
}
  
export default function Signup() {
  return (
    <div
     className="p-5 bg-slate-900 shadow-lg rounded-lg"
    >
    
    <div
      className="flex items-center mb-9 justify-between"
    >
      <Link
        href="/"
      >
        <div
          className="relative  w-16 h-16 rounded-full"
        >
          <Image 
            src="/assets/logo.png"
            alt="logo"
            fill
            className="rounded-full"
           />
        </div>
      </Link>
      
      <div
      className="flex items-baseline gap-2"
    >
      <p
        className="text-sm tracking-tight text-neutral-200 font-light"
      >
        Already have an account? 
      </p>
      <Link
      href="/signin"
      className="text-white text-[13px] font-normal flex items-center gap-1"
    >
     Sign in    
     <ArrowRightIcon />
     </Link>
     
    </div>
    </div>
    
    
     <section>
       <h1
        className="text-white mb-1 text-2xl font-semibold"
       >
          Create Your Account
        </h1>
        <p
          className="text-neutral-300 font-light"
        >
          to continue to <strong className="font-[500]">Laascaanood Public Library.</strong>
        </p>
     </section>
     
     
     {/* <section
       className="flex my-11 justify-center gap-3"
     >
       <SignInWithGoogle />
       <SignInWithFacebook />
     
     </section> 
     
     <div
       className="mb-11 flex items-center gap-2"
     >
       <div 
         className="h-[1px] bg-neutral-700 flex-1"
       />
       <span
        className="text-sm text-neutral-300"
       >
         or 
       </span>
       <div 
         className="h-[1px] bg-neutral-700 flex-1"
       />
     </div> */}
     
     <SignUpForm />
     
    </div>
  )
}
