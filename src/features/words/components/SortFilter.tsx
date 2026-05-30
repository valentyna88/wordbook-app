import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { sortOptions } from "../types/sort.types";

export type SortOption = "newest" | "oldest" | "az";

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

  return (
    <>
      <Pressable
        style={({ pressed }) => [
          styles.trigger,
          pressed && styles.triggerPressed,
        ]}
        onPress={onOpen}
      >
        <Feather name="sliders" size={20} color={colors.primary} />
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

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 36,
  },

  handle: {
    width: 48,
    height: 5,
    borderRadius: 3,
    backgroundColor: colors.border,
    alignSelf: "center",
    marginBottom: 24,
  },

  sheetTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 16,
  },

  option: {
    minHeight: 56,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  optionText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
  },

  optionTextActive: {
    color: colors.primary,
  },
});
