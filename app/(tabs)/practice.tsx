import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { useWords } from "@/src/context/WordsContext";
import { PracticeActions } from "@/src/features/practice/components/PracticeActions";
import { PracticeCard } from "@/src/features/practice/components/PracticeCard";
import { PracticeNavigation } from "@/src/features/practice/components/PracticeNavigation";
import { PracticeResult } from "@/src/features/practice/components/PracticeResult";
import { usePracticeSession } from "@/src/features/practice/hooks/usePracticeSession";
import { router } from "expo-router";
import * as Speech from "expo-speech";
import { StyleSheet, View } from "react-native";

export default function PracticeScreen() {
  const { words, toggleWordStatus } = useWords();

  const {
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
  } = usePracticeSession({
    words,
    onMarkAsKnown: toggleWordStatus,
  });
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
          onToggleTranslation={toggleTranslation}
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
