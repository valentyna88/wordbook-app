import { Word } from "@/src/features/words/types/word.types";
import { SortOption } from "@/src/features/words/types/sort.types";

export function sortWords(words: Word[], selectedSort: SortOption) {
  return [...words].sort((a, b) => {
    if (selectedSort === "newest") {
      return Number(b.id) - Number(a.id);
    }

    if (selectedSort === "oldest") {
      return Number(a.id) - Number(b.id);
    }

    return a.word.localeCompare(b.word);
  });
}
