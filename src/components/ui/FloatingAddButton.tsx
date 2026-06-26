import { colors } from "@/constants/colors";
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
    bottom: 28,
    right: 20,
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.28,
    shadowRadius: 18,
  },

  icon: {
    color: colors.card,
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "500",
  },
});
