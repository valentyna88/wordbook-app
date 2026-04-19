import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddWordScreen() {
  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Feather name="chevron-left" size={32} color={colors.text.primary} />
        </Pressable>
        <ScreenTitle title="Add a new word" />
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>
          Add a new word to your dictionary. Grow your vocabulary every day.
        </Text>

        <Text style={styles.label}>Word</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a word"
          placeholderTextColor={colors.text.secondary}
        />
        <Text style={styles.label}>Translation</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter translation"
          placeholderTextColor={colors.text.secondary}
        />
        <Text style={styles.label}>Example sentence (optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter example sentence"
          placeholderTextColor={colors.text.secondary}
        />

        <Pressable style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
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
    fontSize: 20,
    fontWeight: "600",
  },
});
