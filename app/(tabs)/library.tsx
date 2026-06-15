import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { ScreenTitle } from "@/components/ui/ScreenTitle";
import { WordPackCard } from "@/features/library/components/WordPackCard";
import { wordPacks } from "@/features/library/data/wordPacks";
import { router } from "expo-router";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function LibraryScreen() {
  return (
    <ScreenContainer>
      <FlatList
        data={wordPacks}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.header}>
            <ScreenTitle title="Library" />
            <Text style={styles.subtitle}>
              Ready-made word packs to start learning faster
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <WordPackCard
            pack={item}
            onPress={() =>
              router.push({
                pathname: "/word-pack/[id]",
                params: { id: item.id },
              })
            }
          />
        )}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  listContent: {
    gap: 16,
    paddingBottom: 24,
  },

  header: {
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "center",
    color: "#6B7280",
  },
});
