export type WordStatus = "learning" | "known";

export type Word = {
  id: string;
  word: string;
  translation: string;
  status: WordStatus;
  example?: string;
};
