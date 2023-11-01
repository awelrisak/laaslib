"use client"

import Image from "next/image"


import { motion } from "framer-motion"
//import { fadeIn } from "@/lib/utilities/motion"

export default function Book({ book, handleClick }: any){
  return (
       <motion.div
            key={book?.id}
            llayoutId={book?.id}
            onClick={handleClick}
            className="relative w-32 h-fit rounded-md flex flex-col gap-3.5 border border-slate-800"
            >
            <div              
              className="relative bg-slate-700 w-full h-36  rounded-md"
            >
             <Image 
               src={book?.volumeInfo?.imageLinks?.thumbnail}
               alt="book"
               
               fill
               className="object-fit"
             />
            </div>
            
            <div
              className="flex flex-col "
            >
              <h3
                className="text-sm text-semibold tracking-tight text-slate-100"
              >
                {
                  book?.volumeInfo?.title?.length > 20 
                  ? book?.volumeInfo?.title?.substring(0, 27) + "..."
                  : book?.volumeInfo?.title
                }
              </h3>
              
              <p
                className="text-neutral-500 text-xs truncate"
              >
                {
                  book?.volumeInfo?.subtitle
                }
              </p>
              
            </div>
            
            </motion.div>
  )
}