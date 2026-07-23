import { useState } from "react";
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type DropdownOption = {
  label: string;
  value: string;
};

type DropdownProps = {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
};

export default function Dropdown({
  label,
  placeholder = "Select an option...",
  options,
  selectedValue,
  onValueChange,
}: DropdownProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const selectedLabel = options.find((o) => o.value === selectedValue)?.label;

  const handleSelect = (value: string) => {
    onValueChange(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.formGroup}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        style={styles.field}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={selectedLabel ? styles.fieldText : styles.placeholderText}>
          {selectedLabel || placeholder}
        </Text>
        <Text style={styles.chevron}>⌄</Text>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.sheet}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.option,
                    item.value === selectedValue && styles.optionSelected,
                  ]}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      item.value === selectedValue && styles.optionTextSelected,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const colors = {
  primary: "#153E75",
  surface: "#FFFFFF",
  border: "#D7E3EE",
  inputBg: "#F7FAFC",
  label: "#4A5D73",
  placeholder: "#9AAAB8",
  selectedBg: "#EAF1F9",
};

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.label,
    marginBottom: 6,
  },

  field: {
    width: "100%",
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.inputBg,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  fieldText: {
    fontSize: 15,
    color: colors.primary,
  },

  placeholderText: {
    fontSize: 15,
    color: colors.placeholder,
  },

  chevron: {
    fontSize: 16,
    color: colors.label,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(15, 42, 77, 0.35)",
    justifyContent: "flex-end",
  },

  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 8,
    maxHeight: "60%",
  },

  option: {
    paddingVertical: 14,
    paddingHorizontal: 20,
  },

  optionSelected: {
    backgroundColor: colors.selectedBg,
  },

  optionText: {
    fontSize: 16,
    color: colors.primary,
  },

  optionTextSelected: {
    fontWeight: "700",
  },
});
