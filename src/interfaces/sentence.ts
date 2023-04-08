import { z } from "zod";
import TranslationDirectionEnum from "./translationDirectionEnum";
import Word from "./word";

const Sentence = z.object({
  uid: z.string(),
  original: z.string(),
  translated: z.string(),
  translationDirection: TranslationDirectionEnum,
  words: z.array(Word),
});

// extract the inferred type like this
type Sentence = z.infer<typeof Sentence>;

export default Sentence;