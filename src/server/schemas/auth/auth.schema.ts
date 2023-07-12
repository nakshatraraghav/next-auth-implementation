import { z } from "zod";

import { name, email, password } from "./auth.error";

export const registerSchema = z.object({
  name: z
    .string({
      invalid_type_error: name.invalid_type,
      required_error: name.required_error,
    })
    .min(3, name.min_length)
    .max(48, name.max_length),
  email: z
    .string({
      invalid_type_error: email.invalid_type,
      required_error: email.required_error,
    })
    .email(email.invalid_email)
    .min(5, email.min_length)
    .max(30, email.max_length),
  password: z
    .string({
      invalid_type_error: password.invalid_type,
      required_error: password.required_error,
    })
    .min(8, password.min_length)
    .max(30, password.max_length),
});

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: email.invalid_type,
      required_error: email.required_error,
    })
    .email(email.invalid_email)
    .min(5, email.min_length)
    .max(30, email.max_length),
  password: z
    .string({
      invalid_type_error: password.invalid_type,
      required_error: password.required_error,
    })
    .min(8, password.min_length)
    .max(30, password.max_length),
});

export type registerBodyType = z.infer<typeof registerSchema>;
export type loginBodyType = z.infer<typeof loginSchema>;
