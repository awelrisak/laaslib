import AccountProfile from "@/components/forms/AccountProfile"

import { fetchUser } from "@/lib/actions/user.actions";



export default async function Page() {
  const user = { a:1 }
  
  return (
    <div
     className="max-w-3xl mx-auto p-5  flex flex-col justify-start" >
    <h2
      className="text-4xl font-semibold"
    >
      Onboarding
    </h2>
    <p
      className="mt-2 mb-4 text-base text-neutral-400"
    >
    Complete your profile now to continue to Laascaanood Public Library.
    </p>
    
    
      <AccountProfile 
       user={user}
       buttonTitle="Continue"
      />

    </div>
  )
}