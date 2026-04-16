import { colors } from "@/src/constants/colors";
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
      <Feather name="search" size={20} color="#A0A0A0" />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
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
    backgroundColor: "#D5F3FF",
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 40,
    shadowColor: colors.text.primary,
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: "#111111",
  },
});
