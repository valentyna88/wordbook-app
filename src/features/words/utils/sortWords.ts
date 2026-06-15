import { SortOption } from "@/features/words/types/sort.types";
import { Word } from "@/features/words/types/word.types";

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
