import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { colors } from "@/src/constants/colors";
import { useWords } from "@/src/context/WordsContext";
import { Feather } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PracticeScreen() {
  const [isTranslationVisible, setIsTranslationVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { words, toggleWordStatus } = useWords();
  const learningWords = words.filter((word) => word.status === "learning");
  const currentWord = learningWords[currentIndex];
  const hasMultipleWords = learningWords.length > 1;

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

    toggleWordStatus(currentWord.id);
    setIsTranslationVisible(false);

    setCurrentIndex((prevIndex) => {
      if (nextLearningWordsCount === 0) {
        return 0;
      }

      return prevIndex >= nextLearningWordsCount ? 0 : prevIndex;
    });
  };

  const handleStillLearning = () => {
    handleNextWord();
  };

  if (!currentWord) {
    return (
      <ScreenContainer>
        <View style={styles.header}>
          <ScreenTitle title="Practice" />
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>No words to practice</Text>
          <Text style={styles.subtitle}>
            Add new words or mark some words as learning
          </Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <ScreenTitle title="Practice" />
      </View>

      <View style={styles.content}>
        <Pressable
          style={styles.card}
          onPress={() => setIsTranslationVisible((prev) => !prev)}
        >
          <View style={styles.wordRow}>
            <Text style={styles.title}>
              {isTranslationVisible
                ? currentWord.translation
                : currentWord.word}
            </Text>

            {!isTranslationVisible ? (
              <Pressable onPress={handleSpeak}>
                <Feather name="volume-2" size={32} color={colors.primary} />
              </Pressable>
            ) : null}
          </View>
        </Pressable>

        <View style={styles.navigation}>
          <Pressable
            style={({ pressed }) => [
              styles.navButton,
              !hasMultipleWords && styles.navButtonDisabled,
              pressed && hasMultipleWords && styles.navButtonPressed,
            ]}
            onPress={handlePreviousWord}
            disabled={!hasMultipleWords}
          >
            <Feather
              name="chevron-left"
              size={28}
              color={colors.text.primary}
            />
          </Pressable>

          <Text style={styles.counter}>
            {currentIndex + 1} / {learningWords.length}
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.navButton,
              !hasMultipleWords && styles.navButtonDisabled,
              pressed && hasMultipleWords && styles.navButtonPressed,
            ]}
            onPress={handleNextWord}
            disabled={!hasMultipleWords}
          >
            <Feather
              name="chevron-right"
              size={28}
              color={colors.text.primary}
            />
          </Pressable>
        </View>
        <View style={styles.actions}>
          <Pressable
            style={({ pressed }) => [
              styles.secondaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleStillLearning}
          >
            <Text style={styles.secondaryButtonText}>Still learning</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.primaryButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleKnowWord}
          >
            <Text style={styles.primaryButtonText}>I know this</Text>
          </Pressable>
        </View>
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
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    paddingVertical: 48,
    paddingHorizontal: 24,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.text.primary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  wordRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },

  title: {
    fontSize: 36,
    lineHeight: 50,
    fontWeight: "500",
    color: colors.text.primary,
    marginBottom: 16,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: "center",
  },

  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    marginTop: 24,
  },

  navButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  navButtonPressed: {
    opacity: 0.7,
  },

  counter: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.secondary,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 24,
  },

  secondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.status.learning,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#FFFBDB",
  },

  primaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.status.known,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    backgroundColor: "#EFFFF0",
  },

  buttonPressed: {
    opacity: 0.8,
  },

  secondaryButtonText: {
    color: colors.status.learning,
    fontSize: 15,
    fontWeight: "600",
  },

  primaryButtonText: {
    color: colors.status.known,
    fontSize: 15,
    fontWeight: "600",
  },
  navButtonDisabled: {
    opacity: 0.5,
    elevation: 0,
  },
});
