import { colors } from "@/constants/colors";
import { WordPack } from "@/features/library/data/wordPacks";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type WordPackCardProps = {
  pack: WordPack;
  onPress: () => void;
};

export function WordPackCard({ pack, onPress }: WordPackCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.iconCircle}>
        <Feather name="layers" size={24} color={colors.primary} />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{pack.title}</Text>
        <Text style={styles.description}>{pack.description}</Text>
        <Text style={styles.meta}>
          {pack.words.length} words • {pack.category}
        </Text>
      </View>

      <Feather name="chevron-right" size={24} color={colors.text.secondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    elevation: 3,
  },

  cardPressed: {
    opacity: 0.75,
  },

  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#E8F7FF",
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    flex: 1,
    gap: 4,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
  },

  description: {
    fontSize: 14,
    color: colors.text.secondary,
  },

  meta: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.primary,
  },
});
