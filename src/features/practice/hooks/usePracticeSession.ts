import { useEffect, useState } from "react";
import { Word } from "@/src/features/words/types/word.types";

type PracticeAnswer = "known" | "learning";

type UsePracticeSessionParams = {
  words: Word[];
  onMarkAsKnown: (id: string) => void;
};

export function usePracticeSession({
  words,
  onMarkAsKnown,
}: UsePracticeSessionParams) {
  const [isTranslationVisible, setIsTranslationVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, PracticeAnswer>>({});
  const [isPracticeCompleted, setIsPracticeCompleted] = useState(false);

  const learningWords = words.filter((word) => word.status === "learning");
  const currentWord = learningWords[currentIndex];
  const hasMultipleWords = learningWords.length > 1;

  useEffect(() => {
    if (isPracticeCompleted && learningWords.length > 0) {
      setAnswers({});
      setCurrentIndex(0);
      setIsTranslationVisible(false);
      setIsPracticeCompleted(false);
    }
  }, [isPracticeCompleted, learningWords.length]);

  const reviewedCount = Object.keys(answers).length;

  const knownCount = Object.values(answers).filter(
    (status) => status === "known",
  ).length;

  const toggleTranslation = () => {
    setIsTranslationVisible((prev) => !prev);
  };

  const handleNextWord = () => {
    setIsTranslationVisible(false);

    setCurrentIndex((prevIndex) => {
      const isLastWord = prevIndex === learningWords.length - 1;

      return isLastWord ? 0 : prevIndex + 1;
    });
  };

  const handlePreviousWord = () => {
    setIsTranslationVisible(false);

    setCurrentIndex((prevIndex) => {
      const isFirstWord = prevIndex === 0;

      return isFirstWord ? learningWords.length - 1 : prevIndex - 1;
    });
  };

  const handleKnowWord = () => {
    if (!currentWord) {
      return;
    }

    const nextLearningWordsCount = learningWords.length - 1;

    setAnswers((prev) => ({
      ...prev,
      [currentWord.id]: "known",
    }));

    onMarkAsKnown(currentWord.id);
    setIsTranslationVisible(false);

    setCurrentIndex((prevIndex) => {
      if (nextLearningWordsCount === 0) {
        setIsPracticeCompleted(true);
        return 0;
      }

      return prevIndex >= nextLearningWordsCount ? 0 : prevIndex;
    });
  };

  const handleStillLearning = () => {
    if (!currentWord) {
      return;
    }

    setAnswers((prev) => ({
      ...prev,
      [currentWord.id]: "learning",
    }));

    handleNextWord();
  };

  return {
    currentWord,
    learningWords,
    currentIndex,
    hasMultipleWords,
    isTranslationVisible,
    isPracticeCompleted,
    reviewedCount,
    knownCount,
    toggleTranslation,
    handleNextWord,
    handlePreviousWord,
    handleKnowWord,
    handleStillLearning,
  };
}
