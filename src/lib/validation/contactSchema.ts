import { z } from 'zod'

export const contactSchema = z.object({
  phone: z
    .string()
    .trim()
    .min(1, "This field can't be left empty!")
    .regex(/^01[0125][0-9]{8}$/, 'Phone number must be 11 numbers'),
  email: z
    .string()
    .trim()
    .min(1, "This field can't be left empty!")
    .email('Email should follow the format example@email.com'),
  message: z.string().trim().min(1, "This field can't be left empty!"),
})

export type ContactFormValues = z.infer<typeof contactSchema>
