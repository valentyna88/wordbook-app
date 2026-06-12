import { NewWord, Word } from "@/src/features/words/types/word.types";
import { createWord } from "@/src/features/words/utils/createWord";

import {
  loadWordsFromStorage,
  saveWordsToStorage,
} from "@/src/features/words/storage/wordsStorage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type WordsContextType = {
  words: Word[];
  isLoading: boolean;
  addWord: (newWord: NewWord) => void;
  deleteWord: (id: string) => void;
  updateWord: (updatedWord: Word) => void;
  toggleWordStatus: (id: string) => void;
};

const WordsContext = createContext<WordsContextType | undefined>(undefined);

export function WordsProvider({ children }: { children: ReactNode }) {
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWords = async () => {
      const loadedWords = await loadWordsFromStorage();

      setWords(loadedWords);
      setIsLoading(false);
    };

    loadWords();
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    saveWordsToStorage(words);
  }, [words, isLoading]);

  const addWord = (newWord: NewWord) => {
    setWords((prev) => [createWord(newWord), ...prev]);
  };

  const deleteWord = (id: string) => {
    setWords((prev) => prev.filter((word) => word.id !== id));
  };

  const updateWord = (updatedWord: Word) => {
    setWords((prev) =>
      prev.map((word) => (word.id === updatedWord.id ? updatedWord : word)),
    );
  };

  const toggleWordStatus = (id: string) => {
    setWords((prev) =>
      prev.map((word) =>
        word.id === id
          ? {
              ...word,
              status: word.status === "learning" ? "known" : "learning",
            }
          : word,
      ),
    );
  };

  return (
    <WordsContext.Provider
      value={{
        words,
        isLoading,
        addWord,
        deleteWord,
        updateWord,
        toggleWordStatus,
      }}
    >
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
