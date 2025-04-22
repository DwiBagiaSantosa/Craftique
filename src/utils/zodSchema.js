import { z } from "zod"

export const profileSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    lastName: z.string().nullable().optional(),
    dateOfBirth: z.string().nullable().optional(),
    gender: z.enum(['Male', 'Female']).nullable().optional(),
    email: z.string().email({ message: 'Invalid email address' }).min(1, { message: 'Email is required' }),
    phoneNumber: z.string().nullable().optional(),
    image: z.any().optional()
})