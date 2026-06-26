import { colors } from "@/constants/colors";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, TextInput, View } from "react-native";

type SearchInputProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function SearchInput({
  value,
  onChangeText,
  placeholder = "Search by word or translation",
}: SearchInputProps) {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color={colors.text.placeholder} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.text.placeholder}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface.input,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 52,
    shadowColor: "#142040",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "500",
    color: colors.text.primary,
  },
});
