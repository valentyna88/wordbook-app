export type SortOption = "newest" | "oldest" | "az";

export const sortOptions: { label: string; value: SortOption }[] = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "Alphabetical (A-Z)", value: "az" },
];
