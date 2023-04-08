import { OpenAIApi, Configuration } from "openai";
import { AxiosError } from "axios";
import { TRPCError } from "@trpc/server";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const model = "gpt-3.5-turbo-0301";
export const openAi = new OpenAIApi(configuration);

const PROMPT =
  "Can you translate this sentence to traditional Mandarin and segment the words? Also, please provide a translation, max of 3 translations per word, include the word, pronunciation, and translation. Provide a response in JSON format (return only a json response) and lowercase the keys";

type SegmentedSentence = {
  sentence: string;
  translation: string;
  segments: {
    pronunciation: string;
    word: string;
    translation: string[];
  };
};
export const getSegmentedSentence = async (
  sentence: string
): Promise<SegmentedSentence> => {
  try {
    const response = await openAi.createChatCompletion({
      model,
      messages: [{ role: "user", content: `${PROMPT}: ${sentence}` }],
    });

    return JSON.parse(
      String(response.data.choices?.[0]?.message?.content ?? "{}")
    ) as SegmentedSentence;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "ChatGPT returned an error: " + e?.message,
      });
    }

    throw new TRPCError({
      code: "PARSE_ERROR",
      message: `Could not parse response from ChatGPT: ${
        // bad; can we get TS to handle this?
        (e as Error)?.message ?? "Unknown error"
      }`,
    });
  }
};
