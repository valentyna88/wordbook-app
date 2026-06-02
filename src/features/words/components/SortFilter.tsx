import { colors } from "@/src/constants/colors";
import { spacing } from "@/src/constants/spacing";
import { typography } from "@/src/constants/typography";
import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { SortOption, sortOptions } from "../types/sort.types";

type SortFilterProps = {
  selectedSort: SortOption;
  visible: boolean;
  onChange: (sort: SortOption) => void;
  onOpen: () => void;
  onClose: () => void;
};

export function SortFilter({
  selectedSort,
  visible,
  onChange,
  onOpen,
  onClose,
}: SortFilterProps) {
  const handleSelectSort = (sort: SortOption) => {
    onChange(sort);
    onClose();
  };

  const renderSortIcon = () => {
    if (selectedSort === "az") {
      return <Text style={styles.azIcon}>A-Z</Text>;
    }

    return (
      <View style={styles.sortButton}>
        <Feather
          name="arrow-up"
          size={16}
          color={
            selectedSort === "oldest" ? colors.primary : colors.text.secondary
          }
        />
        <Feather
          name="arrow-down"
          size={16}
          color={
            selectedSort === "newest" ? colors.primary : colors.text.secondary
          }
        />
      </View>
    );
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
        {renderSortIcon()}
      </Pressable>

      <Modal visible={visible} animationType="slide" transparent>
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={styles.handle} />

            <Text style={styles.sheetTitle}>Sort by</Text>

            {sortOptions.map((option) => {
              const isActive = selectedSort === option.value;

              return (
                <Pressable
                  key={option.value}
                  style={[styles.option, isActive && styles.optionActive]}
                  onPress={() => handleSelectSort(option.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isActive && styles.optionTextActive,
                    ]}
                  >
                    {option.label}
                  </Text>

                  {isActive ? (
                    <Feather name="check" size={20} color={colors.primary} />
                  ) : null}
                </Pressable>
              );
            })}
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },

  triggerPressed: {
    opacity: 0.8,
  },

  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },

  azIcon: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: spacing.lg,
    paddingTop: 12,
    paddingBottom: spacing.xl,
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
    fontWeight: typography.title.fontWeight,
    color: colors.text.primary,
    marginBottom: spacing.md,
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
});
