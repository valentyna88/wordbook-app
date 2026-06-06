import { colors } from "@/src/constants/colors";
import { spacing } from "@/src/constants/spacing";
import { defaultCategories } from "@/src/features/words/data/defaultCategories";
import { Feather } from "@expo/vector-icons";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

type CategorySelectorProps = {
  value?: string;
  visible: boolean;
  onOpen: () => void;
  onClose: () => void;
  onChange: (category: string) => void;
};

export function CategorySelector({
  value,
  visible,
  onOpen,
  onClose,
  onChange,
}: CategorySelectorProps) {
  const selectedLabel = value || "Choose category";

  const handleSelectCategory = (category: string) => {
    onChange(category);
    onClose();
  };

  return (
    <>
      <Pressable style={styles.trigger} onPress={onOpen}>
        <Text style={[styles.triggerText, !value && styles.placeholder]}>
          {selectedLabel}
        </Text>

        <Feather name="chevron-down" size={20} color={colors.text.secondary} />
      </Pressable>

      <Modal visible={visible} animationType="slide" transparent>
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={styles.handle} />

            <Text style={styles.sheetTitle}>Choose category</Text>

            <ScrollView style={styles.optionsList} showsVerticalScrollIndicator>
              {defaultCategories.map((category) => {
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

              <Pressable style={styles.customOption}>
                <Feather name="plus" size={20} color={colors.primary} />

                <Text style={styles.customOptionText}>Custom category</Text>
              </Pressable>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
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

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: spacing.lg,
    paddingTop: 12,
    paddingBottom: spacing.xl,
    maxHeight: "70%",
  },

  handle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.border,
    alignSelf: "center",
    marginBottom: 20,
  },

  sheetTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: spacing.md,
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
