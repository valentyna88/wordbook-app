import { colors } from "@/constants/colors";
import { WordStatus } from "@/features/words/types/word.types";
import { StyleSheet, Text, View } from "react-native";

type Props = {
  status: WordStatus;
};

export function StatusBadge({ status }: Props) {
  const isLearning = status === "learning";

  return (
    <View
      style={[
        styles.badge,
        isLearning ? styles.learningBadge : styles.knownBadge,
      ]}
    >
      <Text
        style={[
          styles.text,
          isLearning ? styles.learningText : styles.knownText,
        ]}
      >
        {isLearning ? "Learning" : "Known"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 77,
    paddingHorizontal: 13,
    paddingVertical: 6,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  learningBadge: {
    backgroundColor: colors.status.learning,
  },
  knownBadge: {
    backgroundColor: colors.status.known,
  },
  text: {
    fontSize: 13,
    lineHeight: 13,
    fontWeight: "600",
    color: colors.text.primary,
  },
  learningText: {
    color: colors.status.learningText,
  },
  knownText: {
    color: colors.status.knownText,
  },
});
