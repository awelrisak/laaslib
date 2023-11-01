import type { NextAuthOptions } from "next-auth"

import bcrypt from "bcrypt";import { fetchUserByEmail } from "@/lib/actions/user.actions";

import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"

import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"


export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    
    CredentialsProvider({
    name: "Credentials",
    
    credentials: {
      email: { 
         label: "Email", 
         type: "email", 
         placeholder: "cabdirisaaq@email.com" 
         },
      password: { 
       label: "Password", 
       type: "password" 
       }
    },
    
    async authorize(credentials) {
      
      if(!credentials?.email){
        return null
      }
      
      if(!credentials?.password){
        return null
      }
      
      const user = await fetchUserByEmail(credentials?.email)
      
      if(!(user || user?.hashedPassword)){
        return null
      }
      
      const isPasswordCorrect =  await bcrypt.compare(credentials?.password, user?.hashedPassword as string)
      
      if(isPasswordCorrect){        
        return {...user, hashedPassword: "hidden"}
        
      } else{        
        return null
      }
      
    }//authorize close
  })
  ],
  callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
   console.log("account", account)
   console.log("profile", profile)
   console.log("user", user)
    return true
  },
    
  async jwt({ token, account, user }) {
    // Persist the OAuth access_token and or the user id to the token right after signin
    if (account) {
      token.accessToken = account.access_token
      token.id = user?.id
    }
    
    user && (token.user = user)
    
    return token
  },
  
  async session({ session, token }) {    
    return {
     ...session,
     user: token.user,
     accessToken: token.accessToken
     }
    },
    
 },
 
  secret: process.env.NEXTAUTH_SECRET,
  session: {
     strategy: "jwt"
  },
  debug: process.env.NODE_ENV === "development",
  theme: {
      colorScheme: "dark", // "auto" | "dark" | "light"
      brandColor: "", // Hex color code
      logo: "/assets/logo.png", // Absolute URL to image
      buttonText: "" // Hex color code
     }
}