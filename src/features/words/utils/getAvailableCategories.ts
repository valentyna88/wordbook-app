import { defaultCategories } from "@/features/words/data/defaultCategories";
import { Word } from "@/features/words/types/word.types";

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
