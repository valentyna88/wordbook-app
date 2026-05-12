import { colors } from "@/src/constants/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PracticeResultProps = {
  isCompleted: boolean;
  reviewedCount: number;
  knownCount: number;
  onBackToWords: () => void;
};

export function PracticeResult({
  isCompleted,
  reviewedCount,
  knownCount,
  onBackToWords,
}: PracticeResultProps) {
  return (
    <>
      <View style={styles.card}>
        <Text style={styles.title}>
          {isCompleted ? "Practice completed" : "No words to practice"}
        </Text>

        <Text style={styles.subtitle}>
          {isCompleted
            ? `Reviewed: ${reviewedCount} Known: ${knownCount}`
            : "Add new words or mark some words as learning"}
        </Text>
      </View>

      <Pressable
        style={({ pressed }) => [
          styles.resultButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={onBackToWords}
      >
        <Text style={styles.resultButtonText}>Back to words</Text>
      </Pressable>
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
