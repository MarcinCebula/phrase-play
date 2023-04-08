import { z } from "zod";
import { nanoid } from "nanoid";
import Input from "~/interfaces/input";
import type Word from "~/interfaces/word";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getSegmentedSentence } from "~/utils/open-ai";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const resp = await ctx.prisma.sentence.findMany({
      select: {
        sentenceUID: true,
        sentence: true,
        words: true,
      },
    });
    return resp;
  }),

  getSecretMessage: publicProcedure.query(({}) => {
    return {
      hello: "you can now see this secret message!",
      secretMessage: "you can now see this secret message!",
    };
  }),
  createAnki: publicProcedure.input(Input).mutation(async ({ input, ctx }) => {
    const translation = await getSegmentedSentence(input.sentence);
    const result = await ctx.prisma.sentence.upsert({
      create: {
        sentence: translation.sentence,
        pinyin: translation.sentence,
        translatedDirection: input.translationDirection,
        sentenceUID: translation.sentence.toLowerCase().replace(/\s/g, "_"),
        words: translation.segments?.map(
          (segment) =>
            ({
              original: segment.word,
              pinyin: segment.pronunciation,
              translated: segment.translation,
              audioFileUrl: "",
            } as Word)
        ),
      },
      update: {},
      where: {
        sentenceUID: translation.sentence.toLowerCase().replace(/\s/g, "_"),
      },
      select: {
        sentenceUID: true,
        pinyin: true,
        sentence: true,
        words: true,
        translatedDirection: true,
      },
    });

    return {
      sentence: result,
    };
  }),
});
