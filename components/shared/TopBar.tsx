import Link from "next/link"

import ProfileDrawer from "@/components/shared/ProfileDrawer"

import ProfileButton from "@/components/shared/ProfileButton"

import PageTitle from "@/components/shared/PageTitle"

import Search from "@/components/icons/Search"
import { getServerSession } from "next-auth/next"
import { options } from "@/app/api/auth/[...nextauth]/options"

export default async function TopBar() {
  const session = await getServerSession(options)
  
  return (
    <>
    <header 
       className="topbar">
      
     <ProfileButton
       user={session?.user}
      />
     
     <PageTitle />
     
      <Link
        href="/search"
      >
        <Search />
      </Link>
    </header>
    
    </>
  );
}
