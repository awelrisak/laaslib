"use client"

import Image from "next/image"

import { usePathname } from "next/navigation"

const mainNavs = [ "/", "books", "create blog", "notifications", "community", "search"]

export default function(){
  const pathname = usePathname()
  
  const slicedPathname = pathname.slice(1) .replace("-", " ")
  
  
  return (
    <div
       className="relative flex-1 flex gap-2 justify-center items-center rounded-full"
     >
     
          
       {
         (slicedPathname && mainNavs.includes(slicedPathname) )?
         (
           <h4
             className="text-xl font-semibold capitalize"
           >
             { slicedPathname }
           </h4>
         ) : (
           <div
       className="relative w-9 h-9 bg-slate-800 flex justify-between items-between rounded-full"
      >
        <Image 
          src="/assets/logo.png"
          alt="logo"
          fill
          className="rounded-full object-containe"
        />
      </div>
         )
       }
     </div>
  )
}