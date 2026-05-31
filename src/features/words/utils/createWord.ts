import { Word } from "@/src/features/words/types/word.types";

type NewWord = {
  word: string;
  translation: string;
  example?: string;
  category?: string;
};

export function createWord(newWord: NewWord): Word {
  return {
    id: Date.now().toString(),
    word: newWord.word,
    translation: newWord.translation,
    status: "learning",
    example: newWord.example,
    category: newWord.category,
  };
}
