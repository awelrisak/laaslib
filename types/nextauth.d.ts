import NextAuth, { DefaultUser, DefaultSession } from "next-auth"
n
declare module 'next-auth' {
  
   /* Leveraged by session callback's user object (AdapterUser extends User)*/
   
   interface User extends IUser {}
   
   interface Session {
    user?: User;
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}
