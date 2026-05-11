import { InfoModal } from "@/src/components/ui/InfoModal";
import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { colors } from "@/src/constants/colors";
import { useWords } from "@/src/context/WordsContext";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ModalContent = {
  title: string;
  content: string;
};

export default function SettingsScreen() {
  const [modalContent, setModalContent] = useState<ModalContent | null>(null);

  const { words } = useWords();

  const totalWords = words.length;
  const learningWords = words.filter((word) => word.status === "learning");
  const knownWords = words.filter((word) => word.status === "known");

  return (
    <ScreenContainer>
      <ScreenTitle title="Settings" />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overview</Text>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalWords}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{learningWords.length}</Text>
            <Text style={styles.statLabel}>Learning</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>{knownWords.length}</Text>
            <Text style={styles.statLabel}>Known</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App</Text>

        <SettingsItem
          icon="info"
          title="About WordBook"
          onPress={() =>
            setModalContent({
              title: "About WordBook",
              content:
                "WordBook is a simple vocabulary learning app. Add words, listen to pronunciation, practice with flashcards, and track your learning progress.",
            })
          }
        />

        <SettingsItem
          icon="shield"
          title="Privacy Policy"
          onPress={() =>
            setModalContent({
              title: "Privacy Policy",
              content:
                "WordBook stores your words locally on your device. The app does not send your vocabulary data to any external server.",
            })
          }
        />

        <SettingsItem
          icon="file-text"
          title="Terms of Use"
          onPress={() =>
            setModalContent({
              title: "Terms of Use",
              content:
                "WordBook is provided for personal learning purposes. You are responsible for the words and content you add to the app.",
            })
          }
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <SettingsItem
          icon="mail"
          title="Contact us"
          onPress={() =>
            setModalContent({
              title: "Contact us",
              content:
                "For questions, feedback, or support, please contact the WordBook team at support@wordbook.app.",
            })
          }
        />
      </View>

      <InfoModal
        visible={modalContent !== null}
        title={modalContent?.title ?? ""}
        content={modalContent?.content ?? ""}
        onClose={() => setModalContent(null)}
      />
    </ScreenContainer>
  );
}

type SettingsItemProps = {
  icon: keyof typeof Feather.glyphMap;
  title: string;
  onPress: () => void;
};

function SettingsItem({ icon, title, onPress }: SettingsItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      onPress={onPress}
    >
      <View style={styles.itemLeft}>
        <Feather name={icon} size={20} color={colors.primary} />
        <Text style={styles.itemTitle}>{title}</Text>
      </View>

      <Feather name="chevron-right" size={20} color={colors.text.secondary} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 24,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 12,
  },

  statsGrid: {
    flexDirection: "row",
    gap: 12,
  },

  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    elevation: 3,
  },

  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 4,
  },

  statLabel: {
    fontSize: 13,
    color: colors.text.secondary,
  },

  item: {
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
  },

  itemPressed: {
    opacity: 0.7,
  },

  itemLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  itemTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text.primary,
  },
});
