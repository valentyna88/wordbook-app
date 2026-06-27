import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { StyleSheet, Text } from "react-native";

type ScreenTitleProps = {
  title: string;
};

export function ScreenTitle({ title }: ScreenTitleProps) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    ...typography.largeTitle,
    color: colors.text.primary,
    textAlign: "center",
    marginTop: 10,
  },
});
