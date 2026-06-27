import { TextStyle } from "react-native";

type Typography = {
  largeTitle: TextStyle;
  title: TextStyle;
  subtitle: TextStyle;
  body: TextStyle;
  button: TextStyle;
  caption: TextStyle;
  heading: TextStyle;
};

export const typography: Typography = {
  largeTitle: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 34,
    lineHeight: 42,
  },

  title: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 32,
    lineHeight: 40,
  },

  subtitle: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    lineHeight: 24,
  },

  body: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 16,
    lineHeight: 24,
  },

  button: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 17,
    lineHeight: 22,
  },

  caption: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 14,
    lineHeight: 20,
  },

  heading: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 22,
    lineHeight: 28,
  },
};
