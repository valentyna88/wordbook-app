import { colors } from "@/src/constants/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PracticeResultProps = {
  isCompleted: boolean;
  reviewedCount: number;
  knownCount: number;
  selectedCategory: string;
  onBackToWords: () => void;
};

export function PracticeResult({
  isCompleted,
  reviewedCount,
  knownCount,
  selectedCategory,
  onBackToWords,
}: PracticeResultProps) {
  const isCategorySelected = selectedCategory !== "All categories";

  const emptyTitle = isCategorySelected
    ? `No learning words in ${selectedCategory}`
    : "No words to practice";

  const emptySubtitle = isCategorySelected
    ? "Try another category or mark words as learning"
    : "Add new words or mark some words as learning";

  return (
    <>
      <View style={styles.card}>
        <Text style={styles.title}>
          {isCompleted ? "Great job!" : emptyTitle}
        </Text>

        <Text style={styles.subtitle}>
          {isCompleted
            ? `Reviewed: ${reviewedCount} Known: ${knownCount}`
            : emptySubtitle}
        </Text>
      </View>

      {isCompleted && (
        <Pressable
          style={({ pressed }) => [
            styles.resultButton,
            pressed && styles.buttonPressed,
          ]}
          onPress={onBackToWords}
        >
          <Text style={styles.resultButtonText}>Go to My Words</Text>
        </Pressable>
      )}
    </>
  );
}

const styles = StyleSheet.create({
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

  resultButton: {
    marginTop: 24,
    alignSelf: "center",
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },

  resultButtonText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: "600",
  },

  buttonPressed: {
    opacity: 0.8,
  },
});
