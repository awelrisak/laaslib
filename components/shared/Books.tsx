"use client"

import { motion, AnimatePresence } from "framer-motion"

import colors from "tailwindcss/colors"

import { useState, useEffect } from "react"

import { useInView } from "react-intersection-observer"

import { toast } from "react-hot-toast"

import DoneRingRound from "@/components/icons/DoneRingRound"; 
import Spinner from "@/components/icons/Spinner";

import { getGoogleBooks } from "@/lib/actions/book.actions";

import Book from "@/components/shared/Book"

import { bookGenres } from "@/constants"

import { zoomIn } from "@/lib/utilities/motion"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface Props {
  initialBooks: any;
  initialSubject: string,
  total: number;
}



/*

 
{items.map(item => (
  <motion.div  >
    <motion.h5>{item.subtitle}</motion.h5>
    <motion.h2>{item.title}</motion.h2>
  </motion.div>
))}

<AnimatePresence>
  {selectedId && (
    <motion.div layoutId={selectedId}>
      <motion.h5>{item.subtitle}</motion.h5>
      <motion.h2>{item.title}</motion.h2>
      <motion.button onClick={() => setSelectedId(null)} />
    </motion.div>
  )}
</AnimatePresence>
*/



export default function Books({
  initialBooks,
  initialSubject,
  total
}: any){
  
  const [ books, setBooks ] = useState(initialBooks) 
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [ subject, setSubject ] = useState(initialSubject)  
  
   
  const [ref, inView, entry] = useInView();
  const [ currentIndex, setCurrentIndex ] = useState(1)
  const [ totalNumber, setTotalNumber ] = useState(total)
  
  const skipAmount = currentIndex * 30 //max result
  const isNext = totalNumber > skipAmount + books?.length //is there more to fetch
  
  
  
  useEffect(() => {
    
    if(!(inView && isNext)) return
    
    try{
      
      getGoogleBooks({
          q: `subject:${subject}`,
          startIndex: skipAmount.toString(),
          printType: "books",
          maxResults: "30",
      })
      .then((books: any) => {
        setBooks((prev: any) => [...prev, ...books?.items])
        setTotalNumber(books.totalItems)
        setCurrentIndex(prev => prev + 1)
      })
      
    } catch(error: any){
      toast("Oops, something went wrong", {
        duration: 5000,
        icon: "😬",
        style: {
            padding: "8px 14px",
            borderRadius: "15px",
            backgroundColor: colors.slate[800], //slate-800
            border: `1px solid ${colors.slate[700]}`, //slate-700
            color: "white"                
              }
          })
    }
       
  }, [inView])
  
  
  useEffect(() => {
    
    if(!subject) return 
    
    try{
          
      getGoogleBooks({
          q: `subject:${subject}`,
          startIndex: skipAmount.toString(),
          printType: "books",
          maxResults: "30",
      })
      .then((books: any) => {
        setBooks(books.items?.length ? [...books?.items  ] : [])
        setTotalNumber(books.totalItems)
        setCurrentIndex(prev => prev + 1)
        
      })
      
      window.scrollTo(0, 0,)
      
    } catch(error: any){
      toast("Oops, something went wrong", {
        duration: 5000,
        icon: "😬",
        style: {
            padding: "8px 14px",
            borderRadius: "15px",
            backgroundColor: colors.slate[800], //slate-800
            border: `1px solid ${colors.slate[700]}`, //slate-700
            color: "white"                
              }
          })
    }
       
  }, [subject])
  
  
  return (
    <div      
    >
    <div
      className="sticky top-0 z-10 py-2 my-4 flex justify-between items-center bg-slate-950"
    >
      <h2
        className="text-xl font-bold tracking-tight capitalize"
      >
        { subject || "History" }
      </h2>
      
      <Select
        onValueChange={setSubject}
      >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Choose a subject" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Subjects</SelectLabel>
          {
            bookGenres?.map((genre: string) => {
              return (
                <SelectItem 
                  key={genre}
                  value={genre}
                   >
                   
                   { genre }
                </SelectItem>
              )                    
            })
          }
        </SelectGroup>
      </SelectContent>
    </Select>
      
    </div>
    
    <div
     className="flex flex-wrap max-sm: justify-center max-sm:gap-11 gap-x-7 gap-y-9"
    >
    
       {
         !books && (
           <p
             className="my-5 text-center text-neutral-500 text-base font-bold"
           >
             No books to show
           </p>
         )
       }
       
      {
        books?.map((book: any) => {
          return (
            <Book 
              key={book?.id}
              
              book={book}
              handleClick={() => setSelectedBookId(book.id)}       
            />
          )
        })
      }
      
       <AnimatePresence>
            {selectedBookId && (
               <motion.div 
                   layoutId={selectedBookId}
                   className="absolute bg-slate-300 w-60 h-60 rounded-md"
                  variants={zoomIn("spring", 0, 1)}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                   >
                   <motion.h5>
                    hello
                   </motion.h5>
                   
               <motion.h2>
                  subtitle
               </motion.h2>
           <motion.button 
            onClick={() => setSelectedBookId(null)}
             >
              close
             </motion.button>
      </motion.div>
  )}
</AnimatePresence>

    </div>
    {
      isNext && (
        <div
          ref={ref}
          className="py-2 flex justify-center"
       >
          <Spinner />
       </div>
      )
    }
    {
      (books?.length > 0 && !isNext) && (
        <div
          className="py-4 mt-5  flex justify-center gap-2"
        >
         <DoneRingRound />
         <p
          className="text-sm font-semibold"
         >
          Hoorey, You cought up!
         </p>
          
        </div>
      )
    }
    </div>
  )
}