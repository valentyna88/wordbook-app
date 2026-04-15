import { colors } from "@/src/constants/colors";
import { WordStatus } from "@/src/features/words/types/word.types";
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
      <Text style={styles.text}>{isLearning ? "Learning" : "Known"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    minWidth: 77,
    height: "auto",
    paddingHorizontal: 12,
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
    fontSize: 12,
    fontWeight: "400",
    color: colors.text.primary,
  },
});
