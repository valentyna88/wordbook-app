import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ScreenTitle } from "@/components/ui/ScreenTitle";
import { colors } from "@/constants/colors";
import { useWords } from "@/context/WordsContext";
import { WordForm, WordFormValues } from "@/features/words/components/WordForm";
import { getAvailableCategories } from "@/features/words/utils/getAvailableCategories";
import { validateWordForm } from "@/features/words/utils/wordValidation";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function EditWordScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { words, updateWord } = useWords();

  const wordItem = words.find((item) => item.id === id);
  const categories = getAvailableCategories(words);

  const [errors, setErrors] = useState({
    word: "",
    translation: "",
  });

  if (!wordItem) {
    return <Text>Word not found</Text>;
  }

  const handleSave = (values: WordFormValues) => {
    const trimmedWord = values.word.trim();
    const trimmedTranslation = values.translation.trim();

    const newErrors = validateWordForm({
      words,
      word: values.word,
      translation: values.translation,
      currentWordId: wordItem.id,
    });

    if (newErrors.word || newErrors.translation) {
      setErrors(newErrors);
      return;
    }

    updateWord({
      ...wordItem,
      word: trimmedWord,
      translation: trimmedTranslation,
      example: values.example.trim() || undefined,
      category: values.category.trim() || undefined,
    });

    router.replace({
      pathname: "/",
      params: { toast: "Word updated", type: "success" },
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Feather name="chevron-left" size={32} color={colors.text.primary} />
        </Pressable>
        <ScreenTitle title="Edit word" />
      </View>
      <WordForm
        subtitle="Update your word"
        submitLabel="Save changes"
        initialValues={{
          word: wordItem.word,
          translation: wordItem.translation,
          category: wordItem.category ?? "",
          example: wordItem.example ?? "",
        }}
        categories={categories}
        errors={errors}
        onErrorsChange={setErrors}
        onSubmit={handleSave}
      />
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
});
