import { z } from "zod";

const Word = z.object({
  original: z.string(),
  translated: z.array(z.string()),
  pinyin: z.string(),
  audioFileUrl: z.string().optional()
});

// extract the inferred type like this
type Word = z.infer<typeof Word>;

export default Word;