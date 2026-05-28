import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { useWords } from "@/src/context/WordsContext";
import { PracticeActions } from "@/src/features/practice/components/PracticeActions";
import { PracticeCard } from "@/src/features/practice/components/PracticeCard";
import { PracticeNavigation } from "@/src/features/practice/components/PracticeNavigation";
import { PracticeResult } from "@/src/features/practice/components/PracticeResult";
import { usePracticeSession } from "@/src/features/practice/hooks/usePracticeSession";
import { CategoryFilter } from "@/src/features/words/components/CategoryFilter";
import { router, useFocusEffect } from "expo-router";
import * as Speech from "expo-speech";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function PracticeScreen() {
  const { words, toggleWordStatus } = useWords();

  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);

  const categories = Array.from(
    new Set(
      words
        .map((word) => word.category)
        .filter((category): category is string => Boolean(category)),
    ),
  );

  const {
    currentWord,
    learningWords,
    currentIndex,
    hasMultipleWords,
    isTranslationVisible,
    isPracticeCompleted,
    reviewedCount,
    knownCount,
    stillLearningCount,
    toggleTranslation,
    handleNextWord,
    handlePreviousWord,
    handleKnowWord,
    handleStillLearning,
    resetPractice,
  } = usePracticeSession({
    words,
    selectedCategory,
    onMarkAsKnown: toggleWordStatus,
  });

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetPractice();
      };
    }, [resetPractice]),
  );

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

  const categoryFilter = (
    <CategoryFilter
      categories={categories}
      selectedCategory={selectedCategory}
      onChange={setSelectedCategory}
      visible={isCategoryModalVisible}
      onOpen={() => setIsCategoryModalVisible(true)}
      onClose={() => setIsCategoryModalVisible(false)}
    />
  );

  if (!currentWord) {
    return (
      <ScreenContainer>
        <View style={styles.header}>
          <ScreenTitle title="Practice" />
        </View>

        {categoryFilter}

        <PracticeResult
          isCompleted={isPracticeCompleted}
          reviewedCount={reviewedCount}
          knownCount={knownCount}
          stillLearningCount={stillLearningCount}
          selectedCategory={selectedCategory}
          onBackToWords={() => {
            resetPractice();
            router.push("/");
          }}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <ScreenTitle title="Practice" />
      </View>

      {categoryFilter}

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
    marginBottom: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
});
