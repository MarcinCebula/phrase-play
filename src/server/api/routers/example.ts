import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
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

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.sentence.findMany({
      select: {
        sentenceUID: true,
        sentence: true,
        words: true,
      },
    });
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
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
