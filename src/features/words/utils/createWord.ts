import { NewWord, Word } from "@/features/words/types/word.types";
import * as Crypto from "expo-crypto";

export function createWord(newWord: NewWord): Word {
  return {
    id: Crypto.randomUUID(),
    createdAt: Date.now(),
    word: newWord.word,
    translation: newWord.translation,
    status: "learning",
    example: newWord.example,
    category: newWord.category,
  };
}
