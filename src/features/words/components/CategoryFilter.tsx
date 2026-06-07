import { BottomSheet } from "@/src/components/ui/BottomSheet";
import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type CategoryFilterProps = {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function CategoryFilter({
  categories,
  selectedCategory,
  onChange,
  visible,
  onOpen,
  onClose,
}: CategoryFilterProps) {
  const sortedCategories = [...categories].sort((a, b) => a.localeCompare(b));
  const options = ["All categories", ...sortedCategories];

  const handleSelectCategory = (category: string) => {
    onChange(category);
    onClose();
  };

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.trigger,
          pressed && styles.triggerPressed,
        ]}
        onPress={onOpen}
      >
        <View style={styles.triggerLeft}>
          <Feather name="tag" size={18} color={colors.primary} />
          <Text style={styles.triggerText}>{selectedCategory}</Text>
        </View>

        <Feather name="chevron-down" size={20} color={colors.text.secondary} />
      </Pressable>

      <BottomSheet visible={visible} onClose={onClose}>
        <Text style={styles.sheetTitle}>Choose category</Text>

        <ScrollView style={styles.optionsList} showsVerticalScrollIndicator>
          {options.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <Pressable
                key={category}
                style={[styles.option, isActive && styles.optionActive]}
                onPress={() => handleSelectCategory(category)}
              >
                <Text
                  style={[
                    styles.optionText,
                    isActive && styles.optionTextActive,
                  ]}
                >
                  {category}
                </Text>

                {isActive ? (
                  <Feather name="check" size={20} color={colors.primary} />
                ) : null}
              </Pressable>
            );
          })}
        </ScrollView>
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    marginTop: 12,
    marginBottom: 8,
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
  },

  triggerPressed: {
    opacity: 0.75,
  },

  triggerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  triggerText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },

  sheetTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 16,
  },

  optionsList: {
    maxHeight: 520,
  },

  option: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionActive: {
    backgroundColor: "#E8F7FF",
  },

  optionText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text.primary,
  },

  optionTextActive: {
    color: colors.primary,
    fontWeight: "700",
  },
});
