import { storageKeys } from "@/constants/storageKeys";
import { WordsProvider } from "@/context/WordsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";

function InitialRedirect() {
  const [isReady, setIsReady] = useState(false);

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
      setIsReady(true);
    };

    checkWelcomeStatus();
  }, []);

  if (!isReady) return null;
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
