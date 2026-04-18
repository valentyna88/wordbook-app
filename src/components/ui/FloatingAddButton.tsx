import { colors } from "@/src/constants/colors";
import { Pressable, StyleSheet, Text } from "react-native";

type FloatingAddButtonProps = {
  onPress: () => void;
};

export function FloatingAddButton({ onPress }: FloatingAddButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.icon}>+</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 54,
    height: 54,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },

  icon: {
    color: "#FFFAFA",
    fontSize: 24,
  },
});
