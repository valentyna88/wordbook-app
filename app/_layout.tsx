import { storageKeys } from "@/src/constants/storageKeys";
import { WordsProvider } from "@/src/context/WordsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect } from "react";

function InitialRedirect() {
  useEffect(() => {
    const checkWelcomeStatus = async () => {
      try {
        const hasSeenWelcome = await AsyncStorage.getItem(
          storageKeys.hasSeenWelcome,
        );

        if (!hasSeenWelcome) {
          router.replace("/welcome");
        }
      } catch (error) {
        console.log("Error checking welcome status:", error);
      }
    };

    checkWelcomeStatus();
  }, []);

  return null;
}

export default function RootLayout() {
  return (
    <WordsProvider>
      <InitialRedirect />
      <Stack screenOptions={{ headerShown: false }} />
    </WordsProvider>
  );
}
