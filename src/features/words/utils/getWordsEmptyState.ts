import { StatusFilterValue } from "@/features/words/components/StatusFilter";

type GetWordsEmptyStateParams = {
  hasWords: boolean;
  searchQuery: string;
  filteredWordsCount: number;
  statusFilter: StatusFilterValue;
  selectedCategory: string;
};

type WordsEmptyState = {
  title: string;
  subtitle: string;
} | null;

export function getWordsEmptyState({
  hasWords,
  searchQuery,
  filteredWordsCount,
  statusFilter,
  selectedCategory,
}: GetWordsEmptyStateParams): WordsEmptyState {
  const isCategorySelected = selectedCategory !== "All categories";
  const hasSearchQuery = searchQuery.trim() !== "";

  if (!hasWords || filteredWordsCount > 0) {
    return null;
  }

  if (hasSearchQuery) {
    return {
      title: "Nothing found",
      subtitle: "Try another word or translation",
    };
  }

  if (statusFilter !== "all") {
    const statusLabel = statusFilter === "learning" ? "learning" : "known";

    return {
      title: isCategorySelected
        ? `No ${statusLabel} words in ${selectedCategory}`
        : `No ${statusLabel} words`,
      subtitle:
        statusFilter === "learning"
          ? "Add new words or keep practicing"
          : "Mark words as known to see them here",
    };
  }

  return null;
}
