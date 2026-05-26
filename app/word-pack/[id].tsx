import { PrimaryButton } from "@/src/components/ui/PrimaryButton";
import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { colors } from "@/src/constants/colors";
import { wordPacks } from "@/src/features/library/data/wordPacks";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import * as Speech from "expo-speech";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function WordPackDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const pack = wordPacks.find((item) => item.id === id);

  if (!pack) {
    return (
      <ScreenContainer>
        <Text>Word pack not found</Text>
      </ScreenContainer>
    );
  }

  const handlePracticePack = () => {
    router.push({
      pathname: "/word-pack-practice/[id]",
      params: { id: pack.id },
    });
  };

  const handleSpeak = (word: string) => {
    Speech.speak(word, {
      language: "en",
      pitch: 1,
      rate: 0.9,
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Feather name="chevron-left" size={32} color={colors.text.primary} />
        </Pressable>

        <ScreenTitle title={pack.title} />
      </View>

      <Text style={styles.description}>{pack.description}</Text>

      <View style={styles.card}>
        <Text style={styles.meta}>
          {pack.words.length} words • {pack.category}
        </Text>

        {pack.words.map((item) => (
          <View key={item.word} style={styles.wordRow}>
            <View style={styles.wordHeader}>
              <Text style={styles.word}>{item.word}</Text>

              <Pressable onPress={() => handleSpeak(item.word)}>
                <Feather name="volume-2" size={20} color={colors.primary} />
              </Pressable>
            </View>

            <Text style={styles.translation}>{item.translation}</Text>
          </View>
        ))}
      </View>

      <PrimaryButton title="Practice this pack" onPress={handlePracticePack} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 18,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    gap: 16,
    elevation: 3,
  },

  meta: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary,
    marginBottom: 4,
  },

  wordRow: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 12,
  },

  word: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
  },

  translation: {
    fontSize: 15,
    color: colors.text.secondary,
    marginTop: 4,
  },

  wordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
