import { Word } from "@/features/words/types/word.types";

export function getWordCategories(words: Word[]) {
  return Array.from(
    new Set(
      words
        .map((word) => word.category)
        .filter((category): category is string => Boolean(category)),
    ),
  );
}
