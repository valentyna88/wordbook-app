import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { StatusBadge } from "@/src/components/ui/StatusBadge";
import { colors } from "@/src/constants/colors";
import { useWords } from "@/src/context/WordsContext";
import { DeleteWordModal } from "@/src/features/words/components/DeleteWordModal";
import { Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function WordDetailsScreen() {
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const { id } = useLocalSearchParams<{ id: string }>();
  const { words, deleteWord } = useWords();
  const wordItem = words.find((item) => item.id === id);

  if (!wordItem) {
    return <Text>Word not found</Text>;
  }

  const handleConfirmDelete = () => {
    deleteWord(wordItem.id);
    setIsDeleteModalVisible(false);

    router.replace({
      pathname: "/",
      params: { toast: "Word deleted" },
    });
  };

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Feather name="chevron-left" size={32} color={colors.text.primary} />
        </Pressable>

        <ScreenTitle title="Word Details" />
      </View>

      <View style={styles.card}>
        <Text style={styles.word}>{wordItem.word}</Text>
        <Text style={styles.translation}>{wordItem.translation}</Text>

        {wordItem.example && (
          <View style={styles.exampleCard}>
            <Text style={styles.exampleLabel}>Example:</Text>
            <Text style={styles.exampleText}>{wordItem.example}</Text>
          </View>
        )}

        <View style={styles.progressRow}>
          <Text style={styles.progressLabel}>Progress</Text>
          <StatusBadge status={wordItem.status} />
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable
          style={styles.editButton}
          onPress={() =>
            router.push({
              pathname: "/edit-word",
              params: { id: wordItem.id },
            })
          }
        >
          <Feather name="edit" size={20} color="#FFFFFF" />
          <Text style={styles.editButtonText}>Edit</Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={() => setIsDeleteModalVisible(true)}
        >
          <Feather name="trash-2" size={20} color="#FF5151" />
          <Text style={styles.deleteButtonText}>Delete</Text>
        </Pressable>
      </View>
      <DeleteWordModal
        visible={isDeleteModalVisible}
        onCancel={() => setIsDeleteModalVisible(false)}
        onConfirm={handleConfirmDelete}
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
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    shadowColor: colors.text.primary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  word: {
    fontSize: 32,
    fontWeight: "600",
    color: "#111111",
    textAlign: "center",
    marginBottom: 12,
  },

  translation: {
    fontSize: 20,
    color: colors.text.secondary,
    textAlign: "center",
    marginBottom: 24,
  },

  exampleCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
    shadowColor: colors.text.primary,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },

  exampleLabel: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 4,
  },

  exampleText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.secondary,
  },

  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  progressLabel: {
    fontSize: 16,
    color: colors.text.primary,
  },
  actions: {
    flexDirection: "row",
    gap: 16,
    marginTop: 44,
  },

  editButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
  },

  deleteButton: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: colors.card,
    borderRadius: 12,
    paddingVertical: 14,
  },

  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },

  deleteButtonText: {
    color: colors.danger,
    fontSize: 16,
    fontWeight: "600",
  },
});
