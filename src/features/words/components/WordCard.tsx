import { StatusBadge } from "@/src/components/ui/StatusBadge";
import { colors } from "@/src/constants/colors";
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
            onPress={handleSpeak}
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
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
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
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  speakButton: {
    padding: 6,
    borderRadius: 18,
  },

  speakButtonPressed: {
    opacity: 0.6,
  },
  translation: {
    fontSize: 18,
    fontWeight: "400",
    color: colors.text.secondary,
  },
});
