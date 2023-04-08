import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";
import { getSegmentedSentence } from "~/utils/open-ai";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getSegmentedSentence: publicProcedure
    .input(z.object({ sentence: z.string() }))
    .query(async ({ input }) => {
      const translation = await getSegmentedSentence(input.sentence);

      return {
        translation,
      };
    }),
});
