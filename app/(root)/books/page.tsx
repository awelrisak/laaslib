import Image from 'next/image'

import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"

import { getGoogleBooks } from "@/lib/actions/book.actions"
import Books from "@/components/shared/Books"


export default async function Page() {
  const session = await getServerSession(options)
 
   const books = await getGoogleBooks({
          q: "subject:history",
          startIndex: "0",
          printType: "books",
          maxResults: "30",
      })
 
  return (
    <section 
     className="relative"
    >            
      <Books 
        initialBooks={books.items}
        initialSubject={null}
        total={books.totalItems}
      />
                  
    </section>
  )
}
