import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const model = "gpt-3.5-turbo-0301";
export const openAi = new OpenAIApi(configuration);

const PROMPT =
  "Can you translate this sentence to traditional Mandarin and segment the words? Also, please provide a translation, max of 3 translations per word, include the word, pronunciation, and translation. Provide a response in JSON format (return only a json response) and lowercase the keys";

export const getSegmentedSentence = async (
  sentence: string
): Promise<Record<string, unknown> | null> => {
  try {
    const response = await openAi.createChatCompletion({
      model,
      messages: [{ role: "user", content: `${PROMPT}: ${sentence}` }],
    });

    return JSON.parse(
      String(response.data.choices?.[0]?.message?.content ?? "{}")
    ) as Record<string, unknown>;
  } catch (e) {
    return null;
  }
};
