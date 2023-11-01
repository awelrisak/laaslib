import * as z from "zod";

export const logInFormValidation = z.object({
  email: z.string().email(),
  password: z.string(),
});
