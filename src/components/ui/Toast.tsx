import { colors } from "@/src/constants/colors";
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
    bottom: 60,
    left: 20,
    right: 20,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  success: {
    backgroundColor: "#22C55E",
  },

  error: {
    backgroundColor: colors.danger,
  },

  text: {
    color: colors.card,
    fontSize: 14,
  },
});
