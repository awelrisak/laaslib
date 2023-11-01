import '../globals.css'

import ToasterContext from "@/contexts/ToasterContext"

import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })


export const metadata = {
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
      <body className={`${inter.className} p-0 m-0`}>
        <ToasterContext />
        <main
          className="relative h-screen max-w-xl mx-auto p-2 bg-slate-950 flex items-center justify-center "
        >
          <section
           className="main"
          >
            {children}
          </section>
        </main>

      </body>
    </html>
  )
}
