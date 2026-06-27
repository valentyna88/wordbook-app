import { storageKeys } from "@/constants/storageKeys";
import { WordsProvider } from "@/context/WordsContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
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
  const [fontsLoaded] = useFonts({
    "PlusJakartaSans-Regular": require("../assets/fonts/PlusJakartaSans-Regular.ttf"),
    "PlusJakartaSans-Medium": require("../assets/fonts/PlusJakartaSans-Medium.ttf"),
    "PlusJakartaSans-SemiBold": require("../assets/fonts/PlusJakartaSans-SemiBold.ttf"),
    "PlusJakartaSans-Bold": require("../assets/fonts/PlusJakartaSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <WordsProvider>
      <InitialRedirect />
      <Stack screenOptions={{ headerShown: false }} />
    </WordsProvider>
  );
}
