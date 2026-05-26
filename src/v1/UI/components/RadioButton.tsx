import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Option = {
  label: string;
  value: string;
};

type RadioButtonProps = {
  label?: string;  
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  style?: object;
  children?: React.ReactNode;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  options,
  value,
  onChange,
  disabled = false,
  style = {},
  children,
}) => {
  return (
    <View style={[styles.container, style]}>

      {label && <Text style={styles.groupLabel}>{label}</Text>}

      <View style={styles.optionsRow}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.option}
          onPress={() => !disabled && onChange(option.value)}
          disabled={disabled}
        >
          <View style={styles.circle}>
            {value === option.value && <View style={styles.checked} />}
          </View>
          <Text style={styles.label}>{option.label}</Text>
        </TouchableOpacity>
      ))}
      </View>
      {children && <View style={styles.childrenWrapper}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 4,
  },
  groupLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
    color: "#222",
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "black",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  checked: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
  label: {
    fontSize: 14,
    color: "#333",
  },
  childrenWrapper: {
    marginBottom: 0,
    marginTop: 4,
    width: "100%",
  },
});

export default RadioButton;