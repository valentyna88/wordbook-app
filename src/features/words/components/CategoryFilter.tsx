import { BottomSheet } from "@/components/ui/BottomSheet";
import { colors } from "@/constants/colors";
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
    marginBottom: 8,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 16,
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#142040",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
  triggerPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.99 }],
  },
  triggerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  triggerText: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
    color: colors.text.primary,
  },
  sheetTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 16,
  },
  optionsList: {
    maxHeight: 520,
  },
  option: {
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 14,
    marginBottom: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  optionActive: {
    backgroundColor: colors.primaryTint,
  },
  optionText: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: "500",
    color: colors.text.primary,
  },
  optionTextActive: {
    color: colors.primary,
    fontWeight: "700",
  },
});
