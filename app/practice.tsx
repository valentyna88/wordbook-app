import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { colors } from "@/src/constants/colors";
import { useWords } from "@/src/context/WordsContext";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function PracticeScreen() {
  const [isTranslationVisible, setIsTranslationVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { words } = useWords();

  const learningWords = words.filter((word) => word.status === "learning");
  const currentWord = learningWords[currentIndex];

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
        <Pressable onPress={() => router.back()}>
          <Feather name="chevron-left" size={32} color={colors.text.primary} />
        </Pressable>

        <ScreenTitle title="Practice" />
      </View>

      <View style={styles.content}>
        <Pressable
          style={styles.card}
          onPress={() => setIsTranslationVisible((prev) => !prev)}
        >
          {isTranslationVisible ? (
            <>
              <Text style={styles.title}>{currentWord.translation}</Text>

              <Text style={styles.subtitle}>Tap to hide translation</Text>
            </>
          ) : (
            <>
              <Text style={styles.title}>{currentWord.word}</Text>

              <Text style={styles.subtitle}>Tap to show translation</Text>
            </>
          )}
        </Pressable>

        <View style={styles.navigation}>
          <Pressable
            style={({ pressed }) => [
              styles.navButton,
              pressed && styles.navButtonPressed,
            ]}
            onPress={handlePreviousWord}
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
              pressed && styles.navButtonPressed,
            ]}
            onPress={handleNextWord}
          >
            <Feather
              name="chevron-right"
              size={28}
              color={colors.text.primary}
            />
          </Pressable>
        </View>
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
});
