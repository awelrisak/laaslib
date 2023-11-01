import Image from 'next/image'

import SignOut from "@/components/auth/SignOut"

import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"

import Books from "@/components/shared/Books"

import { getGoogleBooks } from "@/lib/actions/book.actions"


export default async function Home() {
  const session = await getServerSession(options)
 
   const books = await getGoogleBooks()
 
  return (
    <section >
      <h1
        className="text-white text-3xl font-semibold"
      >
        Home
      </h1>
      
     
      
      <h3
        className="text-white"
      >
       User Session:
      </h3>
      <pre
        className="text-white"
      >
        {
          JSON.stringify(session)
        }
        
      </pre>
      <pre
        className="text-white"
      >
        {
          JSON.stringify(Object.keys(books))
        }
        
      </pre>
      
     {/*} <h3
        className="text-white"
      >
       user
      </h3>
      <pre
        className="text-white"
      >
        
        {
          JSON.stringify(typeof user)
        }
      </pre>*/}
        <SignOut />
        
   
    </section>
  )
}
