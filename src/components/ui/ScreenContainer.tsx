import { View, StyleSheet } from "react-native";
import { colors } from "@/src/constants/colors";
import { spacing } from "@/src/constants/spacing";
import { SafeAreaView } from "react-native-safe-area-context";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ScreenContainer({ children }: Props) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
});
