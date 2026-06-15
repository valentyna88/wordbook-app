import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ScreenTitle } from "@/components/ui/ScreenTitle";
import { colors } from "@/constants/colors";
import { wordPacks } from "@/features/library/data/wordPacks";
import { PracticeActions } from "@/features/practice/components/PracticeActions";
import { PracticeCard } from "@/features/practice/components/PracticeCard";
import { PracticeNavigation } from "@/features/practice/components/PracticeNavigation";
import { PracticeResult } from "@/features/practice/components/PracticeResult";
import { usePracticeSession } from "@/features/practice/hooks/usePracticeSession";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import * as Speech from "expo-speech";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function WordPackPracticeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const pack = wordPacks.find((item) => item.id === id);
  const packWords = pack?.words ?? [];

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
    words: packWords,
  });

  if (!pack) {
    return (
      <ScreenContainer>
        <Text>Word pack not found</Text>
      </ScreenContainer>
    );
  }

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
          <Pressable onPress={() => router.back()}>
            <Feather
              name="chevron-left"
              size={32}
              color={colors.text.primary}
            />
          </Pressable>

          <ScreenTitle title={pack.title} />
        </View>

        <PracticeResult
          isCompleted={isPracticeCompleted}
          reviewedCount={reviewedCount}
          knownCount={knownCount}
          stillLearningCount={stillLearningCount}
          selectedCategory="All categories"
          buttonTitle="Back to pack"
          onRepeat={resetPractice}
          onBackToWords={() => {
            resetPractice();
            router.back();
          }}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Feather name="chevron-left" size={32} color={colors.text.primary} />
        </Pressable>

        <ScreenTitle title={pack.title} />
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
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 18,
  },

  content: {
    flex: 1,
    justifyContent: "center",
  },
});
