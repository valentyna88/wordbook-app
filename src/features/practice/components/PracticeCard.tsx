import { colors } from "@/constants/colors";
import { Word } from "@/features/words/types/word.types";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

type PracticeCardProps = {
  word: Word;
  isTranslationVisible: boolean;
  onToggleTranslation: () => void;
  onSpeak: () => void;
};

export function PracticeCard({
  word,
  isTranslationVisible,
  onToggleTranslation,
  onSpeak,
}: PracticeCardProps) {
  return (
    <Pressable style={styles.card} onPress={onToggleTranslation}>
      <View style={styles.wordRow}>
        <Text style={styles.title}>
          {isTranslationVisible ? word.translation : word.word}
        </Text>

        {!isTranslationVisible ? (
          <Pressable onPress={onSpeak}>
            <Feather name="volume-2" size={32} color={colors.primary} />
          </Pressable>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 24,
    paddingVertical: 48,
    paddingHorizontal: 24,
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.text.primary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  wordRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },

  title: {
    fontSize: 36,
    lineHeight: 50,
    fontWeight: "500",
    color: colors.text.primary,
    marginBottom: 16,
    textAlign: "center",
  },
});
