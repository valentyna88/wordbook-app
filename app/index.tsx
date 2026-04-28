import { FloatingAddButton } from "@/src/components/ui/FloatingAddButton";
import { PrimaryButton } from "@/src/components/ui/PrimaryButton";
import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { SearchInput } from "@/src/components/ui/SearchInput";
import { Toast } from "@/src/components/ui/Toast";
import { colors } from "@/src/constants/colors";
import { useWords } from "@/src/context/WordsContext";
import { EmptyState } from "@/src/features/words/components/EmptyState";
import { WordCard } from "@/src/features/words/components/WordCard";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";

export default function HomeScreen() {
  const handleAddWordPress = () => {
    router.push("/add-word");
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const { toast: toastParam, type } = useLocalSearchParams<{
    toast?: string;
    type?: "success" | "error" | "info";
  }>();

  const showToast = (
    message: string,
    type: "success" | "error" | "info" = "info",
  ) => {
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

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const { words, isLoading } = useWords();
  const filteredWords = words.filter(
    (item) =>
      item.word.toLowerCase().includes(normalizedQuery) ||
      item.translation.toLowerCase().includes(normalizedQuery),
  );

  const hasWords = words.length > 0;
  const showSearchEmptyState =
    hasWords && searchQuery.trim() !== "" && filteredWords.length === 0;

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
        renderItem={({ item }) => (
          <WordCard
            item={item}
            onPress={() =>
              router.push({
                pathname: "/word-details/[id]",
                params: { id: item.id },
              })
            }
          />
        )}
        ListEmptyComponent={
          showSearchEmptyState ? (
            <EmptyState
              title="Nothing found"
              subtitle="Try another word or translation"
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
});
