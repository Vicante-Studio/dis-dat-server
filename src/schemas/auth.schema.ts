import { z } from 'zod'

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  first_name: z.string().trim().min(1),
  last_name: z.string().trim().min(1),
  phone_number: z.string().regex(/^\+?[0-9]{7,15}$/, 'Invalid phone number'),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export type RegisterInput = z.infer<typeof registerSchema>
export type LoginInput = z.infer<typeof loginSchema>