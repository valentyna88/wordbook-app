import { colors } from "@/constants/colors";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

export function PrimaryButton({ title, onPress, style }: PrimaryButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
        style,
      ]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    backgroundColor: colors.primary,
    paddingHorizontal: 26,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 5,
  },
  buttonPressed: {
    backgroundColor: colors.primaryPressed,
    transform: [{ scale: 0.97 }],
  },
  text: {
    color: colors.onPrimary,
    fontSize: 17,
    lineHeight: 17,
    fontWeight: "600",
  },
});
