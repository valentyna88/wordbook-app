import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { useWords } from "@/src/context/WordsContext";
import { PracticeActions } from "@/src/features/practice/components/PracticeActions";
import { PracticeCard } from "@/src/features/practice/components/PracticeCard";
import { PracticeNavigation } from "@/src/features/practice/components/PracticeNavigation";
import { PracticeResult } from "@/src/features/practice/components/PracticeResult";
import { router } from "expo-router";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function PracticeScreen() {
  const [isTranslationVisible, setIsTranslationVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [answers, setAnswers] = useState<Record<string, "known" | "learning">>(
    {},
  );
  const [isPracticeCompleted, setIsPracticeCompleted] = useState(false);

  const { words, toggleWordStatus } = useWords();
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

  const handleSpeak = () => {
    if (!currentWord) {
      return;
    }

    Speech.speak(currentWord.word, {
      language: "en",
      pitch: 1,
      rate: 0.9,
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

    toggleWordStatus(currentWord.id);
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

  if (!currentWord) {
    return (
      <ScreenContainer>
        <View style={styles.header}>
          <ScreenTitle title="Practice" />
        </View>

        <PracticeResult
          isCompleted={isPracticeCompleted}
          reviewedCount={reviewedCount}
          knownCount={knownCount}
          onBackToWords={() => router.push("/")}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <ScreenTitle title="Practice" />
      </View>

      <View style={styles.content}>
        <PracticeCard
          word={currentWord}
          isTranslationVisible={isTranslationVisible}
          onToggleTranslation={() => setIsTranslationVisible((prev) => !prev)}
          onSpeak={handleSpeak}
        />
        <PracticeNavigation
          currentIndex={currentIndex}
          totalCount={learningWords.length}
          hasMultipleWords={hasMultipleWords}
          onPrevious={handlePreviousWord}
          onNext={handleNextWord}
        />
        <PracticeActions
          onStillLearning={handleStillLearning}
          onKnowWord={handleKnowWord}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 18,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
});
