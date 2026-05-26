import { BackgroundColors, TextColors } from "src/configs/constants/color";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";

type ButtonFormProps = {
  onPress: () => void;
  text: string;
  style?: ViewStyle | ViewStyle[];
  disabled?: boolean;
};

const ButtonForm: React.FC<ButtonFormProps> = ({ onPress, text, style, disabled }) => (
  <TouchableOpacity
    style={[styles.button, disabled ? styles.buttonDisabled : null, style]}
    onPress={onPress}
    disabled={disabled}
    activeOpacity={disabled ? 1 : 0.85}
  >
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

export default ButtonForm;

const styles = StyleSheet.create({
  button: {
    backgroundColor: BackgroundColors.darkGray,
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 0,
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.55,
  },
  buttonText: {
    color: TextColors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
