import { colors } from "@/constants/colors";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PracticeActionsProps = {
  onStillLearning: () => void;
  onKnowWord: () => void;
};

export function PracticeActions({
  onStillLearning,
  onKnowWord,
}: PracticeActionsProps) {
  return (
    <View style={styles.actions}>
      <Pressable
        style={({ pressed }) => [
          styles.secondaryButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={onStillLearning}
      >
        <Text style={styles.secondaryButtonText}>Still learning</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.primaryButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={onKnowWord}
      >
        <Text style={styles.primaryButtonText}>I know this</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
