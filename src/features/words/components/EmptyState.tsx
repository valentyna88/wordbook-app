import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

type EmptyStateProps = {
  title: string;
  subtitle: string;
};

export function EmptyState({ title, subtitle }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Feather name="book-open" size={28} color={colors.primary} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
  },

  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primaryTint,
    marginBottom: 16,
  },

  title: {
    ...typography.heading,
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: "center",
  },

  subtitle: {
    ...typography.subtitle,
    maxWidth: 270,
    color: colors.text.secondary,
    textAlign: "center",
  },
});
