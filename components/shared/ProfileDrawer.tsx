import Image from "next/image"
import Link from "next/link"


import { motion, AnimatePresence } from "framer-motion"

import { slideIn } from "@/lib/utilities/motion"

import CloseIcon from "@/components/icons/Close"

import MoreHorizontalIcon from "@/components/icons/MoreHorizontal"


interface Props {
  isOpen: boolean;
  setIsOpen: () => void,
  user: any,
}

const backdrop = {
  hidden: {
    opacity: 0,
  },
  
  visible: {
    opacity: 1,
    duration: 0.2,
    when: "afterChildren"
  }
  
}
export default function ProfileDrawer({
  isOpen=false,
  setIsOpen,
  user=null
}: Props){
  
  //stop propagation
  const handleClick = (e: any) => {
    e.stopPropagation()    
  }
  
  return (
     <AnimatePresence>
       {
         isOpen && (
           <motion.div
              onClick={() => setIsOpen(false)}
              variants={backdrop}
              initial="hidden"
              animate="visible"
              exit="hidden"
      className="lg:hidden absolute top-0 left-0 z-30 w-screen h-screen bg-glassmorphism backdrop-blur-md"
    >
       <motion.div
         onClick={handleClick}
          variants={slideIn("left", "spring", 0, 0.475)}
                
     className="absolute px-4 py-2 top-0 left-0 z-20 w-4/5 h-screen bg-glassmorphism shadow-xl shadow-[#8885] backdrop-blur-xl"
    >
      
      <div
        className=" w-full py-1 h-fit  flex items-center justify-between mb-2"
      >
      
        <Link
          href="#"
          className="relative w-14 h-14 bg-sky-600 rounded-full flex items-center justify-center"
        >
           <span
             className="text-lg font-bold"
            >
            A
          </span>
        </Link>
        
        <MoreHorizontalIcon />
      </div>
      
      <div
      >
        <h2
         className="text-lg leading-9 font-semibold tracking-tight "
        >
        <Link
         href="#"
        >
         Abdurezak Farah
        </Link>
        
        </h2>
        
        <h5
          className="text-slate-400 -mt-3 tracking-tighter"
        >
        <Link
         href="#"
        >
          @awelrisak
        </Link>
        </h5>
        
      </div>
   
    </motion.div>
     
      <button
        className="absolute right-6 top-7"
      >
         <CloseIcon />
      </button>
    </motion.div>
         )
       }
            
     </AnimatePresence>
  );
}