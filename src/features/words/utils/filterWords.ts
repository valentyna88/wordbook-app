import { StatusFilterValue } from "@/features/words/components/StatusFilter";
import { Word } from "@/features/words/types/word.types";

type FilterWordsParams = {
  words: Word[];
  searchQuery: string;
  selectedCategory: string;
  statusFilter: StatusFilterValue;
};

export function filterWords({
  words,
  searchQuery,
  selectedCategory,
  statusFilter,
}: FilterWordsParams) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return words.filter((word) => {
    const matchesSearch =
      word.word.toLowerCase().includes(normalizedQuery) ||
      word.translation.toLowerCase().includes(normalizedQuery);

    const matchesStatus =
      statusFilter === "all" || word.status === statusFilter;

    const matchesCategory =
      selectedCategory === "All categories" ||
      word.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });
}
