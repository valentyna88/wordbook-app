import { colors } from "@/src/constants/colors";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type DeleteWordModalProps = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteWordModal({
  visible,
  onCancel,
  onConfirm,
}: DeleteWordModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.card} onPress={() => {}}>
          <Text style={styles.title}>Delete word?</Text>

          <Text style={styles.subtitle}>This action cannot be undone.</Text>

          <View style={styles.actions}>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>

            <Pressable style={styles.deleteButton} onPress={onConfirm}>
              <Text style={styles.deleteText}>Delete</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },

  card: {
    width: "100%",
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 24,
    gap: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
    color: colors.text.primary,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: "center",
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },

  cancelButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: colors.border,
  },

  deleteButton: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: colors.danger,
  },

  cancelText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.secondary,
  },

  deleteText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.card,
  },
});
