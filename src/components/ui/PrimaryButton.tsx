import { colors } from "@/src/constants/colors";
import { Pressable, StyleSheet, Text } from "react-native";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
};

export function PrimaryButton({ title, onPress }: PrimaryButtonProps) {
  return (
    <Pressable style={styles.button}>
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
    marginTop: 50,
  },

  text: {
    color: "#FFFAFA",
    fontSize: 20,
    fontWeight: "600",
  },
});
