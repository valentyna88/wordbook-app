import { colors } from "@/constants/colors";
import { CategorySelector } from "@/features/words/components/CategorySelector";
import { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export type WordFormValues = {
  word: string;
  translation: string;
  category: string;
  example: string;
};

export type WordFormErrors = {
  word: string;
  translation: string;
};

type WordFormProps = {
  subtitle: string;
  submitLabel: string;
  initialValues: WordFormValues;
  categories: string[];
  errors: WordFormErrors;
  onErrorsChange: (errors: WordFormErrors) => void;
  onSubmit: (values: WordFormValues) => void;
};

export function WordForm({
  subtitle,
  submitLabel,
  initialValues,
  categories,
  errors,
  onErrorsChange,
  onSubmit,
}: WordFormProps) {
  const [word, setWord] = useState(initialValues.word);
  const [translation, setTranslation] = useState(initialValues.translation);
  const [example, setExample] = useState(initialValues.example);
  const [category, setCategory] = useState(initialValues.category);
  const [isCategorySelectorVisible, setIsCategorySelectorVisible] =
    useState(false);

  const handleWordChange = (text: string) => {
    setWord(text);

    if (errors.word) {
      onErrorsChange({
        ...errors,
        word: "",
      });
    }
  };

  const handleTranslationChange = (text: string) => {
    setTranslation(text);

    if (errors.translation) {
      onErrorsChange({
        ...errors,
        translation: "",
      });
    }
  };

  const handleOpenCategorySelector = () => {
    Keyboard.dismiss();
    setIsCategorySelectorVisible(true);
  };

  const handleSubmit = () => {
    onSubmit({
      word,
      translation,
      category,
      example,
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <Text style={styles.subtitle}>{subtitle}</Text>

          <Text style={styles.label}>Word</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter a word"
            placeholderTextColor={colors.text.secondary}
            value={word}
            onChangeText={handleWordChange}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {errors.word ? <Text style={styles.error}>{errors.word}</Text> : null}

          <Text style={styles.label}>Translation</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter translation"
            placeholderTextColor={colors.text.secondary}
            value={translation}
            onChangeText={handleTranslationChange}
            autoCapitalize="none"
          />
          {errors.translation ? (
            <Text style={styles.error}>{errors.translation}</Text>
          ) : null}

          <Text style={styles.label}>Category (optional)</Text>

          <CategorySelector
            value={category}
            categories={categories}
            visible={isCategorySelectorVisible}
            onOpen={handleOpenCategorySelector}
            onClose={() => setIsCategorySelectorVisible(false)}
            onChange={setCategory}
          />

          <Text style={styles.label}>Example sentence (optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter example sentence"
            placeholderTextColor={colors.text.secondary}
            value={example}
            onChangeText={setExample}
          />

          <Pressable
            style={({ pressed }) => [
              styles.saveButton,
              pressed && styles.saveButtonPressed,
            ]}
            onPress={handleSubmit}
          >
            <Text style={styles.saveButtonText}>{submitLabel}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
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
  saveButtonPressed: {
    opacity: 0.8,
  },
  saveButtonText: {
    color: "#FFFCFC",
    fontSize: 20,
    fontWeight: "600",
  },
  error: {
    color: colors.danger,
    fontSize: 12,
    marginTop: 4,
  },
});
