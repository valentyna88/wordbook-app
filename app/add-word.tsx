import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ScreenTitle } from "@/components/ui/ScreenTitle";
import { colors } from "@/constants/colors";
import { useWords } from "@/context/WordsContext";
import { WordForm, WordFormValues } from "@/features/words/components/WordForm";
import { getAvailableCategories } from "@/features/words/utils/getAvailableCategories";
import { validateWordForm } from "@/features/words/utils/wordValidation";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

export default function AddWordScreen() {
  const { words, addWord } = useWords();

  const categories = getAvailableCategories(words);

  const [errors, setErrors] = useState({
    word: "",
    translation: "",
  });

  const handleSave = (values: WordFormValues) => {
    const trimmedWord = values.word.trim();
    const trimmedTranslation = values.translation.trim();

    const newErrors = validateWordForm({
      words,
      word: values.word,
      translation: values.translation,
    });

    if (newErrors.word || newErrors.translation) {
      setErrors(newErrors);
      return;
    }

    addWord({
      word: trimmedWord,
      translation: trimmedTranslation,
      example: values.example.trim() || undefined,
      category: values.category.trim() || undefined,
    });

    router.replace({
      pathname: "/",
      params: { toast: "Word added", type: "success" },
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Feather name="chevron-left" size={32} color={colors.text.primary} />
        </Pressable>
        <ScreenTitle title="Add a new word" />
      </View>

      <WordForm
        subtitle="Add a new word to your dictionary. Grow your vocabulary every day."
        submitLabel="Save"
        initialValues={{
          word: "",
          translation: "",
          category: "",
          example: "",
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
