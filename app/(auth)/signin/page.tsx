import Image from "next/image"
import Link from "next/link"

import SignInWithGoogle from "@/components/auth/SignInWithGoogle" 
import SignInWithFacebook from "@/components/auth/SignInWithFacebook"

import ArrowRightIcon from "@/components/icons/ArrowRight"
import LogInForm from "@/components/forms/LogInForm"


import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to Laascaanood Public Library"
}

export default function SignIn() {
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
        New to the Library? 
      </p>
      <Link
      href="/signup"
      className="text-white text-[13px] font-normal flex items-center gap-1 hover:underline hover:underline-2 hover:leading-7"
    >
     Sign up    
     <ArrowRightIcon />
     </Link>
     
    </div>
    </div>
        
     <section>
       <h1
        className="text-white mb-1 text-2xl font-semibold"
       >
          Sign in
        </h1>
        <p
          className="text-neutral-300 font-light"
        >
          to continue to <strong className="font-[500]">Laascaanood Public Library.</strong>
        </p>
     </section>
     
     {/* <section
       className="flex my-9 justify-center gap-3"
     >
       <SignInWithGoogle />
       <SignInWithFacebook />
     
     </section>
     
     <div
       className="mb-9 flex items-center gap-2"
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
     
     <LogInForm />
      
    </div>
  )
}
