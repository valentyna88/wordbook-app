import { Pressable, StyleSheet, Text, View } from "react-native";
import { StatusBadge } from "@/src/components/ui/StatusBadge";
import { colors } from "@/src/constants/colors";
import { Word } from "../types/word.types";

type Props = {
  item: Word;
  onPress?: () => void;
};

export function WordCard({ item, onPress }: Props) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.topRow}>
        <Text style={styles.word}>{item.word}</Text>
        <StatusBadge status={item.status} />
      </View>

      <Text style={styles.translation}>{item.translation}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
    gap: 8,
  },
  cardPressed: {
    opacity: 0.92,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  word: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    color: colors.text.primary,
  },
  translation: {
    fontSize: 18,
    fontWeight: "400",
    color: colors.text.secondary,
  },
});
