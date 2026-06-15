import { Word } from "@/features/words/types/word.types";

type HasDuplicateWordParams = {
  words: Word[];
  word: string;
  currentWordId?: string;
};

export function hasDuplicateWord({
  words,
  word,
  currentWordId,
}: HasDuplicateWordParams) {
  const normalizedWord = word.trim().toLowerCase();

  return words.some(
    (item) =>
      item.id !== currentWordId &&
      item.word.trim().toLowerCase() === normalizedWord,
  );
}

type ValidateWordFormParams = {
  words: Word[];
  word: string;
  translation: string;
  currentWordId?: string;
};

export type WordFormErrors = {
  word: string;
  translation: string;
};

export function validateWordForm({
  words,
  word,
  translation,
  currentWordId,
}: ValidateWordFormParams): WordFormErrors {
  const trimmedWord = word.trim();
  const trimmedTranslation = translation.trim();

  const errors: WordFormErrors = {
    word: "",
    translation: "",
  };

  const isDuplicate = hasDuplicateWord({
    words,
    word: trimmedWord,
    currentWordId,
  });

  if (trimmedWord === "") {
    errors.word = "Word is required";
  } else if (isDuplicate) {
    errors.word = "This word already exists";
  }

  if (trimmedTranslation === "") {
    errors.translation = "Translation is required";
  }

  return errors;
}
