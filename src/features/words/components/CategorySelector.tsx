import { BottomSheet } from "@/src/components/ui/BottomSheet";
import { colors } from "@/src/constants/colors";
import { spacing } from "@/src/constants/spacing";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type CategorySelectorProps = {
  value?: string;
  categories: string[];
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (category: string) => void;
};

export function CategorySelector({
  value,
  categories,
  visible,
  onOpen,
  onClose,
  onChange,
}: CategorySelectorProps) {
  const selectedLabel = value || "Choose category";

  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customCategory, setCustomCategory] = useState("");

  const handleClose = () => {
    setIsCustomMode(false);
    setCustomCategory("");
    onClose();
  };

  const handleSelectCategory = (category: string) => {
    onChange(category);
    handleClose();
  };

  const handleOpenCustomMode = () => {
    setCustomCategory("");
    setIsCustomMode(true);
  };

  const handleSaveCustomCategory = () => {
    const trimmedCategory = customCategory.trim();
    if (!trimmedCategory) {
      return;
    }
    onChange(trimmedCategory);
    handleClose();
  };

  return (
    <>
      <Pressable style={styles.trigger} onPress={onOpen}>
        <Text style={[styles.triggerText, !value && styles.placeholder]}>
          {selectedLabel}
        </Text>

        <Feather name="chevron-down" size={20} color={colors.text.secondary} />
      </Pressable>

      <BottomSheet visible={visible} onClose={handleClose}>
        <Text style={styles.sheetTitle}>
          {isCustomMode ? "Custom category" : "Choose category"}
        </Text>

        {isCustomMode ? (
          <View>
            <TextInput
              style={styles.customInput}
              placeholder="Enter category name"
              placeholderTextColor={colors.text.secondary}
              value={customCategory}
              onChangeText={setCustomCategory}
              autoCapitalize="words"
            />

            <Pressable
              style={({ pressed }) => [
                styles.saveButton,
                pressed && styles.saveButtonPressed,
              ]}
              onPress={handleSaveCustomCategory}
            >
              <Text style={styles.saveButtonText}>Save category</Text>
            </Pressable>
          </View>
        ) : (
          <ScrollView style={styles.optionsList} showsVerticalScrollIndicator>
            {categories.map((category) => {
              const isActive = value === category;

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

            <Pressable
              style={styles.customOption}
              onPress={handleOpenCustomMode}
            >
              <Feather name="plus" size={20} color={colors.primary} />
              <Text style={styles.customOptionText}>Custom category</Text>
            </Pressable>
          </ScrollView>
        )}
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    marginTop: 12,
    marginBottom: 8,
    minHeight: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.card,
  },

  triggerText: {
    fontSize: 16,
    color: colors.text.primary,
  },

  placeholder: {
    color: colors.text.secondary,
  },

  sheetTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: spacing.md,
  },

  customInput: {
    minHeight: 56,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: colors.card,
  },

  saveButton: {
    marginTop: spacing.md,
    minHeight: 52,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  saveButtonPressed: {
    opacity: 0.8,
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.card,
  },

  optionsList: {
    maxHeight: 520,
  },

  option: {
    minHeight: 56,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 16,
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

  customOption: {
    minHeight: 56,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },

  customOptionText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.primary,
  },
});
