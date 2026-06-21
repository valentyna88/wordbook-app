import { PrimaryButton } from "@/components/ui/PrimaryButton";
import { ScreenContainer } from "@/components/ui/ScreenContainer";
import { colors } from "@/constants/colors";
import { storageKeys } from "@/constants/storageKeys";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function WelcomeScreen() {
  const handleGetStarted = async () => {
    try {
      await AsyncStorage.setItem(storageKeys.hasSeenWelcome, "true");
      router.replace("/");
    } catch (error) {
      console.log("Error saving welcome state:", error);
      router.replace("/");
    }
  };

  return (
    <ScreenContainer>
      <View style={styles.container}>
        <View style={styles.iconRow}>
          <View style={styles.iconCircle}>
            <Feather name="message-circle" size={28} color={colors.primary} />
          </View>

          <View style={styles.iconCircle}>
            <Feather name="volume-2" size={28} color={colors.primary} />
          </View>

          <View style={styles.iconCircle}>
            <Feather name="target" size={28} color={colors.primary} />
          </View>
        </View>
        <Text style={styles.title}>Learn words with confidence</Text>

        <Text style={styles.subtitle}>
          Create your own vocabulary, listen to pronunciation, and practice with
          simple flashcards.
        </Text>

        <View style={styles.previewCard}>
          <View>
            <Text style={styles.previewWord}>word</Text>
            <Text style={styles.previewTranslation}>слово</Text>
          </View>

          <View style={styles.previewBadge}>
            <Text style={styles.previewBadgeText}>Learning</Text>
          </View>
        </View>

        <PrimaryButton
          title="Get started"
          onPress={handleGetStarted}
          style={{ marginTop: 50 }}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    gap: 24,
  },

  iconRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginBottom: 8,
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  title: {
    fontSize: 36,
    fontWeight: "700",
    color: colors.text.primary,
    textAlign: "center",
    lineHeight: 44,
  },

  subtitle: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.text.secondary,
    textAlign: "center",
  },

  previewCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: colors.text.primary,
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  previewWord: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 8,
  },

  previewTranslation: {
    fontSize: 20,
    color: colors.text.secondary,
  },

  previewBadge: {
    backgroundColor: colors.status.learning,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },

  previewBadgeText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.text.primary,
  },
});
