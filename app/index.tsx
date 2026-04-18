import { PrimaryButton } from "@/src/components/ui/PrimaryButton";
import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { SearchInput } from "@/src/components/ui/SearchInput";
import { EmptyState } from "@/src/features/words/components/EmptyState";
import { WordCard } from "@/src/features/words/components/WordCard";
import { mockWords } from "@/src/features/words/data/mockWords";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

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
        <ScreenTitle title="My Words" />

        <EmptyState
          title="No words yet"
          subtitle="Add your first word to start building your vocabulary"
        />
        <PrimaryButton title="+ Add your first word" onPress={() => {}} />
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
            <ScreenTitle title="My Words" />
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
});
