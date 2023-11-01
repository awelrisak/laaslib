import '../globals.css'


import ToasterContext from "@/contexts/ToasterContext"

import TopBar from "@/components/shared/TopBar"

import BottomBar from "@/components/shared/BottomBar"

import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Laascaanood Library',
  description: 'The library of Laascaanood',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} h-fit text-slate-50 bg-slate-950 overflow-hidden h-fit no-scrollbar`}>
        <TopBar />
        <ToasterContext /> 
        <main
          className="relative z-0 mx-auto overflow-y-hidden h-[calc(100vh-76px-68px)] lg:h-screen flex justify-between no-scrollbar"
        >
          <div
           className="max-lg:hidden w-[250px] h-screen bg-slate-300"
          >
          
          </div>
          <section
           className="main flex-1 h-full"
          >
            {children}
          </section>
          <div
           className="max-lg:hidden w-[250px] h-screen bg-slate-300"
          >
          </div>
        </main> 
        <BottomBar />
      </body>
    </html>
  )
}
