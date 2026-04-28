import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { colors } from "@/src/constants/colors";
import { useWords } from "@/src/context/WordsContext";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function EditWordScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { words, updateWord } = useWords();

  const wordItem = words.find((item) => item.id === id);
  const [word, setWord] = useState(wordItem?.word ?? "");
  const [translation, setTranslation] = useState(wordItem?.translation ?? "");
  const [example, setExample] = useState(wordItem?.example ?? "");

  const [errors, setErrors] = useState({
    word: "",
    translation: "",
  });

  if (!wordItem) {
    return <Text>Word not found</Text>;
  }

  const handleSave = () => {
    const trimmedWord = word.trim();
    const trimmedTranslation = translation.trim();

    const newErrors = {
      word: "",
      translation: "",
    };

    if (trimmedWord === "") {
      newErrors.word = "Word is required";
    }

    if (trimmedTranslation === "") {
      newErrors.translation = "Translation is required";
    }

    if (newErrors.word || newErrors.translation) {
      setErrors(newErrors);
      return;
    }

    updateWord({
      ...wordItem,
      word: trimmedWord,
      translation: trimmedTranslation,
      example: example.trim() || undefined,
    });

    router.replace({
      pathname: "/",
      params: { toast: "Word updated", type: "success" },
    });
  };

  const handleWordChange = (text: string) => {
    setWord(text);

    if (errors.word) {
      setErrors((prev) => ({
        ...prev,
        word: "",
      }));
    }
  };

  const handleTranslationChange = (text: string) => {
    setTranslation(text);

    if (errors.translation) {
      setErrors((prev) => ({
        ...prev,
        translation: "",
      }));
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Feather name="chevron-left" size={32} color={colors.text.primary} />
        </Pressable>
        <ScreenTitle title="Edit word" />
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Update your word</Text>

        <Text style={styles.label}>Word</Text>
        <TextInput
          style={styles.input}
          value={word}
          onChangeText={handleWordChange}
          placeholder="Enter a word"
          placeholderTextColor={colors.text.secondary}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {errors.word ? <Text style={styles.error}>{errors.word}</Text> : null}

        <Text style={styles.label}>Translation</Text>
        <TextInput
          style={styles.input}
          value={translation}
          onChangeText={handleTranslationChange}
          placeholder="Enter translation"
          placeholderTextColor={colors.text.secondary}
          autoCapitalize="none"
        />
        {errors.translation ? (
          <Text style={styles.error}>{errors.translation}</Text>
        ) : null}

        <Text style={styles.label}>Example sentence (optional)</Text>
        <TextInput
          style={styles.input}
          value={example}
          onChangeText={setExample}
          placeholder="Enter example sentence"
          placeholderTextColor={colors.text.secondary}
        />

        <Pressable
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.saveButtonPressed,
          ]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save changes</Text>
        </Pressable>
      </View>
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
  card: {
    backgroundColor: "#F8F9FB",
    borderRadius: 16,
    padding: 24,
    elevation: 3,
  },

  subtitle: {
    color: colors.text.secondary,
    fontSize: 14,
  },

  label: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 20,
    marginBottom: 8,
  },

  input: {
    backgroundColor: colors.card,
    borderColor: "#C7CDD3",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#FFFCFC",
    fontSize: 18,
    fontWeight: "600",
  },
  saveButtonPressed: {
    opacity: 0.8,
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
});
