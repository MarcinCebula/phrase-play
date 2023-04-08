import * as z from "zod"

export const Example = z.object({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
