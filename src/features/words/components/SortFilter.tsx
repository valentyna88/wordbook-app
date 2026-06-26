import { BottomSheet } from "@/components/ui/BottomSheet";
import { colors } from "@/constants/colors";
import { spacing } from "@/constants/spacing";
import { typography } from "@/constants/typography";
import { Feather } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, View } from "react-native";
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

      <BottomSheet visible={visible} onClose={onClose}>
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
                style={[styles.optionText, isActive && styles.optionTextActive]}
              >
                {option.label}
              </Text>

              {isActive ? (
                <Feather name="check" size={20} color={colors.primary} />
              ) : null}
            </Pressable>
          );
        })}
      </BottomSheet>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: colors.card,
    borderWidth: 1.5,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#142040",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 1,
  },
  triggerPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  azIcon: {
    fontSize: 13,
    lineHeight: 13,
    fontWeight: "700",
    color: colors.primary,
  },
  sheetTitle: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: typography.title.fontWeight,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  option: {
    minHeight: 56,
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 16,
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
