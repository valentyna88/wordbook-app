import { SortOption } from "@/features/words/types/sort.types";
import { Word } from "@/features/words/types/word.types";

export function sortWords(words: Word[], selectedSort: SortOption) {
  return [...words].sort((a, b) => {
    if (selectedSort === "newest") {
      return b.createdAt - a.createdAt;
    }

    if (selectedSort === "oldest") {
      return a.createdAt - b.createdAt;
    }

    return a.word.localeCompare(b.word);
  });
}
