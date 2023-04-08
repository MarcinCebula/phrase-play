import { z } from "zod";

const TranslationDirectionEnum = z.enum(["ChineseToEnglish", "EnglishToChinese"]);
type TranslationDirectionEnum = z.infer<typeof TranslationDirectionEnum>;
export default TranslationDirectionEnum;