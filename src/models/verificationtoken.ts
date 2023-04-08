import * as z from "zod"

export const VerificationToken = z.object({
  identifier: z.string(),
  token: z.string(),
  expires: z.date(),
})
