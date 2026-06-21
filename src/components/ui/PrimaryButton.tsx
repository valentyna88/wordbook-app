import { colors } from "@/constants/colors";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
};

export function PrimaryButton({ title, onPress, style }: PrimaryButtonProps) {
  return (
    <Pressable style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 20,
    alignItems: "center",
  },

  text: {
    color: "#FFFAFA",
    fontSize: 20,
    fontWeight: "600",
  },
});
