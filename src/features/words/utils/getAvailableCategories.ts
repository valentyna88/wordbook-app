import { defaultCategories } from "@/src/features/words/data/defaultCategories";
import { Word } from "@/src/features/words/types/word.types";

export function getAvailableCategories(words: Word[]) {
  return Array.from(
    new Set([
      ...defaultCategories,
      ...words
        .map((word) => word.category)
        .filter((category): category is string => Boolean(category)),
    ]),
  ).sort((a, b) => a.localeCompare(b));
}
