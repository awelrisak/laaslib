"use client"

import { useState } from "react"

import Image from "next/image"

import ProfileDrawer from "@/components/shared/ProfileDrawer"

interface Props{
  user: any;
}
export default function ProfileButtom({
  user
}: props){
  
  const [isDrawerOpen, setIsDrawerOpen ] = useState(false)
  
  return(
    <>
    <button
      onClick={() => setIsDrawerOpen(prev => !prev)}
      className="relative w-8 h-8 bg-slate-800 flex justify-center items-center rounded-full text-slate-50 text-sm font-bold"
     >
    
       {
         user?.image
         ? (
           <Image 
             src={user?.image }
             alt="profile"
             fill
             className="object-fit rounded-full"
           />
         ) : (
           <span
             className="text-lg font-bold uppercase"
           >
              { user?.name?.[0] }
           </span>
            
         )
       }
     </button>
     <ProfileDrawer
       isOpen={isDrawerOpen}
       setIsOpen={setIsDrawerOpen}
     />
     </>
  )
}