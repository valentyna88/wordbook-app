import { Word } from "@/src/features/words/types/word.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type NewWord = {
  word: string;
  translation: string;
  example?: string;
};

type WordsContextType = {
  words: Word[];
  isLoading: boolean;
  addWord: (newWord: NewWord) => void;
  deleteWord: (id: string) => void;
  updateWord: (updatedWord: Word) => void;
  toggleWordStatus: (id: string) => void;
};

const STORAGE_KEY = "WORDS_STORAGE";

const WordsContext = createContext<WordsContextType | undefined>(undefined);

export function WordsProvider({ children }: { children: ReactNode }) {
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadWords = async () => {
      try {
        const storedWords = await AsyncStorage.getItem(STORAGE_KEY);

        if (storedWords) {
          setWords(JSON.parse(storedWords));
        }
      } catch (error) {
        console.log("Error loading words:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadWords();
  }, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const saveWords = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(words));
      } catch (error) {
        console.log("Error saving words:", error);
      }
    };

    saveWords();
  }, [words, isLoading]);

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
