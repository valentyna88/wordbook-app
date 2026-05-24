import { colors } from "@/src/constants/colors";
import { Feather } from "@expo/vector-icons";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
  const options = ["All categories", ...categories];

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

      <Modal visible={visible} animationType="slide" transparent>
        <Pressable style={styles.overlay} onPress={onClose}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={styles.handle} />

            <Text style={styles.sheetTitle}>Choose category</Text>

            <ScrollView showsVerticalScrollIndicator={false}>
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

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 32,
  },

  handle: {
    width: 44,
    height: 5,
    borderRadius: 999,
    backgroundColor: "#D1D5DB",
    alignSelf: "center",
    marginBottom: 20,
  },

  sheetTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 16,
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
