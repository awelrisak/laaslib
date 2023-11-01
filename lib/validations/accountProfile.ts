import * as z from "zod";

export const accountProfileValidation = z
  .object({
    firstName: z
      .string(
        {
          required_error: "Enter your firstname."
        }
      )
      .min(3, {
        message: "Enter your firstname — atleast 3 charachters.",
      })
      .max(17, {
        message: "Firstname should not exceeds 17 characters. ",
      }),

    middleName: z
      .string().optional(),

    lastName: z
      .string({
        required_error: "Enter your lastname."
      })
      .min(3, {
        message: "Enter your lastname — atleast 3 charachters.",
      })
      .max(17, {
        message: "Lastname should not exceeds 17 characters.",
      }),

    email: z.string({
      required_error: "Enter your email.",
    }).email(),

    bio: z.string().optional(),

    birthdate: z.string({
      required_error: "Enter your birthdate.",
    }),
    
    profile: z.string(),
    
    gender: z.string({
      required_error: "Choose your gender.",
    }),
    
    homeTown: z.string().optional(),
    livesIn: z.string().optional(),
  })