import { TextStyle } from "react-native";

type Typography = {
  title: TextStyle;
  subtitle: TextStyle;
};

export const typography: Typography = {
  title: {
    fontSize: 32,
    fontWeight: "700",
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    lineHeight: 24,
  },
};
