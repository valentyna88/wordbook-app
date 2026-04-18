import { StyleSheet, Text } from "react-native";
import { colors } from "@/src/constants/colors";
import { typography } from "@/src/constants/typography";

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
