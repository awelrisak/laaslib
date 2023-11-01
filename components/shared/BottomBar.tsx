"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"

 
import { bottomBar } from "@/constants"


export default function BottomBar() {
 
 const pathname = usePathname()
  
  return (
    <section className="bottombar">
     <nav
       className="bottombar-container"
      >
       {
        bottomBar.map((link) => {
                  
         const isActive = (pathname.includes(link.route) && link.route.length > 1 ) || pathname === link.route
         
        return (
          <Link
           href={link.route}
           shallow={true}
           key={link.label}
           className={`bottombar-link ${isActive ? "bg-slate-100 text-slate-800" : null}`}
          >
            <link.IconComponent />
           <p
              className="max-sm:hidden text-light-1 text-sm font-medium"
            >
              {
               link.label.split(" ")[0]
               }
            </p>
          </Link>
         )
        })
       }
      </nav>
    </section>
  )
}