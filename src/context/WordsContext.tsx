import {
  loadWordsFromStorage,
  saveWordsToStorage,
} from "@/features/words/storage/wordsStorage";
import { NewWord, Word } from "@/features/words/types/word.types";
import { createWord } from "@/features/words/utils/createWord";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
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
    let isMounted = true;

    const loadWords = async () => {
      const loadedWords = await loadWordsFromStorage();

      if (!isMounted) return;

      setWords(loadedWords);
      setIsLoading(false);
    };

    loadWords();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (isLoading) return;

    const timeoutId = setTimeout(() => {
      saveWordsToStorage(words);
    }, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [words, isLoading]);

  const addWord = useCallback((newWord: NewWord) => {
    setWords((prev) => [createWord(newWord), ...prev]);
  }, []);

  const deleteWord = useCallback((id: string) => {
    setWords((prev) => prev.filter((word) => word.id !== id));
  }, []);

  const updateWord = useCallback((updatedWord: Word) => {
    setWords((prev) =>
      prev.map((word) => (word.id === updatedWord.id ? updatedWord : word)),
    );
  }, []);

  const toggleWordStatus = useCallback((id: string) => {
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
  }, []);

  const contextValue = useMemo(
    () => ({
      words,
      isLoading,
      addWord,
      deleteWord,
      updateWord,
      toggleWordStatus,
    }),
    [words, isLoading, addWord, deleteWord, updateWord, toggleWordStatus],
  );

  return (
    <WordsContext.Provider value={contextValue}>
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
