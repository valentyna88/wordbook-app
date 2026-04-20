import { WordsProvider } from "@/src/context/WordsContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <WordsProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </WordsProvider>
  );
}
