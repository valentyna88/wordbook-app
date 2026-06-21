export type WordStatus = "learning" | "known";

export type Word = {
  id: string;
  createdAt: number;
  word: string;
  translation: string;
  status: WordStatus;
  example?: string;
  category?: string;
};

export type NewWord = {
  word: string;
  translation: string;
  example?: string;
  category?: string;
};
