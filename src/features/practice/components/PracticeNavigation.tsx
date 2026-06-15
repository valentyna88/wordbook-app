import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PracticeNavigationProps = {
  currentIndex: number;
  totalCount: number;
  hasMultipleWords: boolean;
  onPrevious: () => void;
  onNext: () => void;
};

export function PracticeNavigation({
  currentIndex,
  totalCount,
  hasMultipleWords,
  onPrevious,
  onNext,
}: PracticeNavigationProps) {
  return (
    <View style={styles.navigation}>
      <Pressable
        style={({ pressed }) => [
          styles.navButton,
          !hasMultipleWords && styles.navButtonDisabled,
          pressed && hasMultipleWords && styles.navButtonPressed,
        ]}
        onPress={onPrevious}
        disabled={!hasMultipleWords}
      >
        <Feather name="chevron-left" size={28} color={colors.text.primary} />
      </Pressable>

      <Text style={styles.counter}>
        {currentIndex + 1} / {totalCount}
      </Text>

      <Pressable
        style={({ pressed }) => [
          styles.navButton,
          !hasMultipleWords && styles.navButtonDisabled,
          pressed && hasMultipleWords && styles.navButtonPressed,
        ]}
        onPress={onNext}
        disabled={!hasMultipleWords}
      >
        <Feather name="chevron-right" size={28} color={colors.text.primary} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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

  navButtonDisabled: {
    opacity: 0.5,
    elevation: 0,
  },

  counter: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.secondary,
  },
});
