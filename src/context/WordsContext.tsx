import { mockWords } from "@/src/features/words/data/mockWords";
import { Word } from "@/src/features/words/types/word.types";
import { createContext, ReactNode, useContext, useState } from "react";

type NewWord = {
  word: string;
  translation: string;
  example?: string;
};

type WordsContextType = {
  words: Word[];
  addWord: (newWord: NewWord) => void;
  deleteWord: (id: string) => void;
};

const WordsContext = createContext<WordsContextType | undefined>(undefined);

export function WordsProvider({ children }: { children: ReactNode }) {
  const [words, setWords] = useState<Word[]>(mockWords);

  const addWord = (newWord: NewWord) => {
    const wordToAdd: Word = {
      id: Date.now().toString(),
      word: newWord.word,
      translation: newWord.translation,
      status: "learning",
      example: newWord.example,
    };

    setWords((prev) => [wordToAdd, ...prev]);
  };

  const deleteWord = (id: string) => {
    setWords((prev) => prev.filter((word) => word.id !== id));
  };

  return (
    <WordsContext.Provider value={{ words, addWord, deleteWord }}>
      {children}
    </WordsContext.Provider>
  );
}

export function useWords() {
  const context = useContext(WordsContext);

  if (!context) {
    throw new Error("useWords must be used within WordsProvider");
  }

  return context;
}
