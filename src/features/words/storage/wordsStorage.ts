import { storageKeys } from "@/constants/storageKeys";
import { Word } from "@/features/words/types/word.types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function loadWordsFromStorage(): Promise<Word[]> {
  try {
    const storedWords = await AsyncStorage.getItem(storageKeys.words);

    if (!storedWords) {
      return [];
    }

    const parsed = JSON.parse(storedWords);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch (error) {
    console.log("Error loading words:", error);
    return [];
  }
}

export async function saveWordsToStorage(words: Word[]) {
  try {
    await AsyncStorage.setItem(storageKeys.words, JSON.stringify(words));
  } catch (error) {
    console.log("Error saving words:", error);
  }
}
