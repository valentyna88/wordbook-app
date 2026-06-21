import { colors } from "@/constants/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";

type PracticeResultProps = {
  isCompleted: boolean;
  reviewedCount: number;
  knownCount: number;
  stillLearningCount: number;
  selectedCategory: string;
  buttonTitle?: string;
  onRepeat?: () => void;
  onBackToWords: () => void;
};

export function PracticeResult({
  isCompleted,
  reviewedCount,
  knownCount,
  stillLearningCount,
  selectedCategory,
  buttonTitle = "Go to My Words",
  onRepeat,
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
      {isCompleted && (
        <View pointerEvents="none" style={styles.confetti}>
          <ConfettiCannon
            count={60}
            origin={{ x: 200, y: -20 }}
            explosionSpeed={250}
            fallSpeed={2200}
            fadeOut
          />
        </View>
      )}

      <View style={styles.card}>
        <Text style={styles.title}>
          {isCompleted ? "Practice completed" : emptyTitle}
        </Text>

        {isCompleted ? (
          <View style={styles.stats}>
            <Text style={styles.resultStats}>
              Completed: {reviewedCount} words
            </Text>
            <Text style={styles.resultStats}> Known: {knownCount}</Text>
            <Text style={styles.resultStats}>
              Still learning: {stillLearningCount}
            </Text>
          </View>
        ) : (
          <Text style={styles.subtitle}>{emptySubtitle}</Text>
        )}
      </View>

      {isCompleted && (
        <View style={styles.resultActions}>
          {onRepeat ? (
            <Pressable
              style={({ pressed }) => [
                styles.resultButton,
                pressed && styles.buttonPressed,
              ]}
              onPress={onRepeat}
            >
              <Text style={styles.resultButtonText}>Repeat practice</Text>
            </Pressable>
          ) : null}

          <Pressable
            style={({ pressed }) => [
              styles.secondaryResultButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={onBackToWords}
          >
            <Text style={styles.secondaryResultButtonText}>{buttonTitle}</Text>
          </Pressable>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  confetti: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    elevation: 10,
    pointerEvents: "none",
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
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 20,
    textAlign: "center",
  },

  stats: {
    alignItems: "center",
    gap: 6,
  },

  resultStats: {
    fontSize: 17,
    lineHeight: 24,
    color: colors.text.secondary,
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

  resultActions: {
    marginTop: 24,
    alignItems: "center",
    gap: 12,
  },

  secondaryResultButton: {
    alignSelf: "center",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },

  secondaryResultButtonText: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: "600",
  },
});
