import { Word } from "@/src/features/words/types/word.types";

type HasDuplicateWordParams = {
  words: Word[];
  word: string;
  currentWordId?: string;
};

export function hasDuplicateWord({
  words,
  word,
  currentWordId,
}: HasDuplicateWordParams) {
  const normalizedWord = word.trim().toLowerCase();

  return words.some(
    (item) =>
      item.id !== currentWordId &&
      item.word.trim().toLowerCase() === normalizedWord,
  );
}
