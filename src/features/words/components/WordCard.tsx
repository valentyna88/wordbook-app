import { StatusBadge } from "@/components/ui/StatusBadge";
import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Word } from "../types/word.types";

type Props = {
  item: Word;
  onPress?: () => void;
};

export function WordCard({ item, onPress }: Props) {
  const handleSpeak = () => {
    Speech.speak(item.word, {
      language: "en",
    });
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
      onPress={onPress}
    >
      <View style={styles.topRow}>
        <Text style={styles.word}>{item.word}</Text>

        <View style={styles.rightActions}>
          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              handleSpeak();
            }}
            accessibilityRole="button"
            accessibilityLabel={`Listen to ${item.word}`}
            style={({ pressed }) => [
              styles.speakButton,
              pressed && styles.speakButtonPressed,
            ]}
          >
            <Feather name="volume-2" size={20} color={colors.primary} />
          </Pressable>

          <StatusBadge status={item.status} />
        </View>
      </View>

      <Text style={styles.translation}>{item.translation}</Text>

      {item.category ? (
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 22,
    padding: 18,
    shadowColor: "#142040",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 4,
  },
  cardPressed: {
    opacity: 0.96,
    transform: [{ scale: 0.99 }],
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  word: {
    flex: 1,
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "700",
    color: colors.text.primary,
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flexShrink: 0,
  },
  speakButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.primarySoft,
    alignItems: "center",
    justifyContent: "center",
  },
  speakButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  translation: {
    marginTop: 3,
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "400",
    color: colors.text.secondary,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    marginTop: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: colors.badge.categoryBackground,
  },
  categoryText: {
    fontSize: 12,
    lineHeight: 12,
    fontWeight: "600",
    color: colors.badge.categoryText,
  },
});
