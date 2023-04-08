import { z } from "zod";
import TranslationDirectionEnum from "./translationDirectionEnum";

const Input = z.object({
  sentence: z.string(),
  translationDirection: TranslationDirectionEnum,
});

// extract the inferred type like this
type Input = z.infer<typeof Input>;

export default Input;