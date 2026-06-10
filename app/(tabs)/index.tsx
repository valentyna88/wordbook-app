import { FloatingAddButton } from "@/src/components/ui/FloatingAddButton";
import { PrimaryButton } from "@/src/components/ui/PrimaryButton";
import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { SearchInput } from "@/src/components/ui/SearchInput";
import { Toast } from "@/src/components/ui/Toast";
import { colors } from "@/src/constants/colors";
import { useWords } from "@/src/context/WordsContext";
import { CategoryFilter } from "@/src/features/words/components/CategoryFilter";
import { EmptyState } from "@/src/features/words/components/EmptyState";
import { SortFilter } from "@/src/features/words/components/SortFilter";
import {
  StatusFilter,
  StatusFilterValue,
} from "@/src/features/words/components/StatusFilter";
import { WordCard } from "@/src/features/words/components/WordCard";
import { SortOption } from "@/src/features/words/types/sort.types";
import { filterWords } from "@/src/features/words/utils/filterWords";
import { getWordCategories } from "@/src/features/words/utils/getWordCategories";
import { getWordsEmptyState } from "@/src/features/words/utils/getWordsEmptyState";
import { sortWords } from "@/src/features/words/utils/sortWords";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

type ToastType = "success" | "error" | "info";

type ToastState = {
  message: string;
  type: ToastType;
} | null;

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All categories");
  const [isCategorySheetVisible, setIsCategorySheetVisible] = useState(false);
  const [isSortSheetVisible, setIsSortSheetVisible] = useState(false);
  const [statusFilter, setStatusFilter] = useState<StatusFilterValue>("all");
  const [selectedSort, setSelectedSort] = useState<SortOption>("newest");
  const [toast, setToast] = useState<ToastState>(null);

  const { words, isLoading } = useWords();

  const { toast: toastParam, type } = useLocalSearchParams<{
    toast?: string;
    type?: ToastType;
  }>();

  const showToast = (message: string, type: ToastType = "info") => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 2000);
  };

  useEffect(() => {
    if (toastParam) {
      showToast(toastParam, type);
    }
  }, [toastParam, type]);

  const categories = getWordCategories(words);

  const filteredWords = filterWords({
    words,
    searchQuery,
    selectedCategory,
    statusFilter,
  });

  const hasWords = words.length > 0;

  const wordsEmptyState = getWordsEmptyState({
    hasWords,
    searchQuery,
    filteredWordsCount: filteredWords.length,
    statusFilter,
    selectedCategory,
  });

  const sortedWords = sortWords(filteredWords, selectedSort);

  const handleAddWordPress = () => {
    router.push("/add-word");
  };

  const handleWordPress = (id: string) => {
    router.push({
      pathname: "/word-details/[id]",
      params: { id },
    });
  };

  if (isLoading) {
    return (
      <ScreenContainer>
        <ScreenTitle title="My Words" />

        <View style={styles.loading}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </ScreenContainer>
    );
  }

  if (!hasWords) {
    return (
      <ScreenContainer>
        <ScreenTitle title="My Words" />

        <EmptyState
          title="No words yet"
          subtitle="Add your first word to start building your vocabulary"
        />
        <PrimaryButton
          title="+ Add your first word"
          onPress={handleAddWordPress}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <FlatList
        data={sortedWords}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenTitle title="My Words" />
            <View style={styles.searchRow}>
              <View style={styles.searchWrapper}>
                <SearchInput
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              <SortFilter
                selectedSort={selectedSort}
                visible={isSortSheetVisible}
                onChange={setSelectedSort}
                onOpen={() => setIsSortSheetVisible(true)}
                onClose={() => setIsSortSheetVisible(false)}
              />
            </View>

            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onChange={setSelectedCategory}
              visible={isCategorySheetVisible}
              onOpen={() => setIsCategorySheetVisible(true)}
              onClose={() => setIsCategorySheetVisible(false)}
            />

            <StatusFilter value={statusFilter} onChange={setStatusFilter} />
          </View>
        }
        renderItem={({ item }) => (
          <WordCard item={item} onPress={() => handleWordPress(item.id)} />
        )}
        ListEmptyComponent={
          wordsEmptyState ? (
            <EmptyState
              title={wordsEmptyState.title}
              subtitle={wordsEmptyState.subtitle}
            />
          ) : null
        }
      />
      <FloatingAddButton onPress={handleAddWordPress} />
      {toast ? <Toast message={toast.message} type={toast.type} /> : null}
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
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
    marginTop: 16,
  },

  searchWrapper: {
    flex: 1,
  },
});
