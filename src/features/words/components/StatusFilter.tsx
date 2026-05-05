import { colors } from "@/src/constants/colors";
import { WordStatus } from "@/src/features/words/types/word.types";
import { Pressable, StyleSheet, Text, View } from "react-native";

export type StatusFilterValue = "all" | WordStatus;

type StatusFilterProps = {
  value: StatusFilterValue;
  onChange: (value: StatusFilterValue) => void;
};

const STATUS_FILTERS: StatusFilterValue[] = ["all", "learning", "known"];

export function StatusFilter({ value, onChange }: StatusFilterProps) {
  return (
    <View style={styles.filters}>
      {STATUS_FILTERS.map((status) => {
        const isActive = value === status;

        return (
          <Pressable
            key={status}
            onPress={() => onChange(status)}
            style={[styles.filterButton, isActive && styles.filterButtonActive]}
          >
            <Text
              style={[styles.filterText, isActive && styles.filterTextActive]}
            >
              {status === "all"
                ? "All"
                : status === "learning"
                  ? "Learning"
                  : "Known"}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: colors.border,
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: "500",
  },
  filterTextActive: {
    color: colors.card,
  },
});
