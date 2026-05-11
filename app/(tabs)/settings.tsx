import { ScreenContainer } from "@/src/components/ui/ScreenContainer";
import { ScreenTitle } from "@/src/components/ui/ScreenTitle";
import { colors } from "@/src/constants/colors";
import { useWords } from "@/src/context/WordsContext";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function SettingsScreen() {
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

        <SettingsItem icon="info" title="About WordBook" />
        <SettingsItem icon="shield" title="Privacy Policy" />
        <SettingsItem icon="file-text" title="Terms of Use" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>

        <SettingsItem icon="mail" title="Contact us" />
      </View>
    </ScreenContainer>
  );
}

type SettingsItemProps = {
  icon: keyof typeof Feather.glyphMap;
  title: string;
};

function SettingsItem({ icon, title }: SettingsItemProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
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
