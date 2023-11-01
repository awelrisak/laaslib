"use client"


import { signIn } from "next-auth/react"

import { toast } from "react-hot-toast"

import { registerUser, isUserEmailRegistered } from "@/lib/actions/user.actions"

import { signUpFormValidation,  SignUpFormValidation} from "@/lib/validations/signUpForm";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
/*import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";*/

export default function SignUpForm() {  
  // 1. Define your form.
  const form = useForm<SignUpFormValidation>({
    resolver: zodResolver(signUpFormValidation),
    defaultValues: {
      firstName: "Cabdirisaaq",
      middleName: "Cawil",
      lastName: "Faarax",
      email: "Abdurazak.awil1@gmail.com",
      password: "Abdurazak@1224",
      confirmPassword: "Abdurazak@1224",
      gender: "male"
    },
  });



  // 2. Define a submit handler.
  async function onSubmit(values: SignUpFormValidation) {
      
      try{
        const isEmailRegistered = await isUserEmailRegistered(values.email)
        
        if(isEmailRegistered){
           toast("Email already registered.", {
             duration: 5000,
             icon: "🫤",
              style: {
                padding: "8px 14px",
                borderRadius: "15px",
                backgroundColor: "#1e293b", //slate-800
                border: "2px solid #334155", //slate-700
                color: "white"                
              }
          })
        }
        
        const newUser = await registerUser(values)
          
        signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: true,
          callbackUrl: "/?from=signup"
        })
        
        /*toast(`Hooray, you did it ${values.firstName}!`, {
            duration: 5000,
             icon: "🎉",
              style: {
                padding: "8px 14px",
                borderRadius: "15px",
                backgroundColor: "#1e293b", //slate-800
                border: "2px solid #334155", //slate-700
                color: "white"                
              }
          })*/
        
        
      } catch(error: any){
        //ignore email exist error
        if(error?.message == "Could not register user: E11000 duplicate key error collection: library.users index: username_1 dup key: { username: null }"){
          return
        }
        
        toast("Oops, something went wrong.", {
             duration: 8000,
             icon: "😬",
              style: {
                padding: "16px 8px",
                borderRadius: "15px",
                backgroundColor: "#1e293b", //slate-800
                border: "2px solid #334155", //slate-700
                color: "white"
              }
          })
      }
            
  }

  return (
    <Form {...form}>
      <form 
         onSubmit={form.handleSubmit(onSubmit)}
         className="space-y-8"
         >
      
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                First Name <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg: Cabdirisaaq"
                  className="form-input"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="middleName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex ">
                Middle Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg: Cawil"
                  className="form-input"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Last Name <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg: Faarax"
                  className="form-input"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex">
                Email <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Eg: myemail@example.com"
                  className="form-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex ">
                Password <span className="text-red-600">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="form-input"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label flex ">
                Confirm password
              </FormLabel>
              <FormControl>
                <Input 
                  type="password"
                  className="form-input" 
                  {...field} 
                  />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="male" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Male
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="female" />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Female
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />*/}

        <Button           
          className="form-btn"
          disabled={form?.formState?.isSubmitting}     
          >
          {
            form?.formState?.isSubmitting
            ? "Registering..."
            : "Sign up"
          }
        </Button>
      </form>
    </Form>
  );
}
