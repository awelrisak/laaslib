"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";

import { logInFormValidation } from "@/lib/validations/logInForm";
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

export default function LogInForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof logInFormValidation>>({
    resolver: zodResolver(logInFormValidation),
    defaultValues: {
      email: "Abdurazak.awil1@gmail.com",
      password: "Abdurazak@1224",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof logInFormValidation>) {
    signIn("credentials", {
      ...values,
      callbackUrl: "/"
    })
  }

  return (
    <Form {...form}>
      <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label flex ">Email</FormLabel>
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
              <FormLabel className="form-label flex justify-between">
                Password
                <Link href="/forgot-password" className="text-blue-500">
                  Forgot password?
                </Link>
              </FormLabel>

              <FormControl>
                <Input className="form-input" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button 
          type="submit" 
          className="form-btn"
          disabled={form.formState.isSubmitting}
          >
          {
            form.formState.isSubmitting
           ? "Signing in..."
           : "Sign in"
          }
        </Button>
      </form>
    </Form>
  );
}
