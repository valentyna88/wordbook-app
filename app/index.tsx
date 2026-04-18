import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/typography";
import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { SearchInput } from "@/src/components/ui/SearchInput";
import { WordCard } from "@/src/features/words/components/WordCard";
import { mockWords } from "@/src/features/words/data/mockWords";
import { EmptyState } from "@/src/features/words/components/EmptyState";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filteredWords = mockWords.filter(
    (item) =>
      item.word.toLowerCase().includes(normalizedQuery) ||
      item.translation.toLowerCase().includes(normalizedQuery),
  );

  const hasWords = mockWords.length > 0;
  const showSearchEmptyState =
    hasWords && searchQuery.trim() !== "" && filteredWords.length === 0;

  if (!hasWords) {
    return (
      <ScreenContainer>
        <Text style={[typography.title, styles.title]}>My Words</Text>

        <EmptyState
          title="No words yet"
          subtitle="Add your first word to start building your vocabulary"
        />
      </ScreenContainer>
    );
  }

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
            <EmptyState
              title="Nothing found"
              subtitle="Try another word or translation"
            />
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
});
