import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { SearchInput } from "@/src/components/ui/SearchInput";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/typography";
import { WordCard } from "@/src/features/words/components/WordCard";
import { mockWords } from "@/src/features/words/data/mockWords";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredWords = mockWords.filter(
    (item) =>
      item.word.toLowerCase().includes(normalizedQuery) ||
      item.translation.toLowerCase().includes(normalizedQuery),
  );

  const showSearchEmptyState =
    searchQuery.trim() !== "" && filteredWords.length === 0;
  return (
    <ScreenContainer>
      <FlatList
        data={filteredWords}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={[typography.title, styles.title]}>My Words</Text>
            <SearchInput value={searchQuery} onChangeText={setSearchQuery} />
          </View>
        }
        renderItem={({ item }) => <WordCard item={item} />}
        ListEmptyComponent={
          showSearchEmptyState ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Nothing found</Text>
              <Text style={styles.emptySubtitle}>
                Try another word or translation
              </Text>
            </View>
          ) : null
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 24,
    gap: 20,
  },
  header: {
    marginBottom: 12,
  },
  title: {
    color: colors.text.primary,
    textAlign: "center",
  },
  emptyState: {
    paddingTop: 32,
    alignItems: "center",
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: "center",
  },
});
