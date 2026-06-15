import { colors } from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
};

export function Toast({ message, type = "info" }: ToastProps) {
  return (
    <View
      style={[
        styles.container,
        type === "success" && styles.success,
        type === "error" && styles.error,
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    left: 32,
    right: 32,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: colors.feedback.info,
  },

  success: {
    backgroundColor: colors.feedback.success,
  },

  error: {
    backgroundColor: colors.feedback.error,
  },

  text: {
    color: colors.card,
    fontSize: 14,
  },
});
