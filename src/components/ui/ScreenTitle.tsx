import { colors } from "@/constants/colors";
import { typography } from "@/constants/typography";
import { StyleSheet, Text } from "react-native";

type ScreenTitleProps = {
  title: string;
};

export function ScreenTitle({ title }: ScreenTitleProps) {
  return <Text style={[typography.title, styles.title]}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: colors.text.primary,
    textAlign: "center",
  },
});
