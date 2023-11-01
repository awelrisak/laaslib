"use server";

import connectToDB from "@/lib/mongoose";
import User from "@/lib/models/user.model"

import bcrypt from "bcrypt";
import { SignUpFormValidation } from "@/lib/validations/signUpForm";

export async function isUserEmailRegistered(
  email: string,
){
  await connectToDB()
  try{
     //find user with the email
     const user = await User.exists({ email })
     
     return user
  } catch(error: any){
    throw new Error(`Could not check if user exists: ${error.message}`)
  }
}

 export async function registerUser(user: SignUpFormValidation){
  if(!(
   user.firstName ||
   user.lastName ||
   user.email ||
   user.password ||
   user.confirmPassword
  )){
    throw new Error(`Can not register empty fields`)
  }
  
  if(user.password !== user.confirmPassword){
    throw new Error(`Confirm password`)
  }
  
  try{
     const hashedPassword = await bcrypt.hash(user.password, 10)
     
     const newUser = new User({
      firstName: user.firstName,
      middleName: user.middleName,
      lastName: user.lastName,
      email: user.email,
      hashedPassword,
     })
     
     await newUser.save()
     
     return newUser
     
  } catch(error: any){
   throw new Error(`Could not register user: ${error.message}`)
  }
}

export async function fetchUserByEmail(email: string) {
  try {
   await connectToDB()
   
   const regex = new RegExp(`^${email}$`, 'i')

    const user: IUser | null = await User.findOne({ 
       email: { $regex: regex }
       })
       .exec();
    
    return user?.toJSON()
    
  } catch (error: any) {
    throw new Error(`Could not fetch user by email: ${error.message}`);
  }
}

/*export async function fetchUserByEmailForLogIn(
    email: string
    ){
 
 await connectToDB()
 
 try{
  const pipeline = [
   //STAGE 1: Match by email
   {
    $match: {
      email: {
        $regex: `^${email}$`,
        $options: "i"
      }
    }
   },
   //STAGE 2: Join Account
   {
    $lookup: {
      from: "accounts",
      localField: "_id",
      foreignField: "userId",
      as: "authAccount"
    }
   },
   //STAGE 3: unwind Account
   {
    $unwind: "$authAccount"
   }
  ]
  
   const user = await User.aggregate(pipeline)
   
   return user?.[0] //remove array made by $match
   
 } catch(error: any){
   throw new Error(`Could not fetch user by email: ${ error.message }`)
 }
}*/
