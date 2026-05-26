import { TextColors } from "src/configs/constants/color";
import React from "react";
import {
  Platform,
  Text,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
  View,
} from "react-native";

interface FormInputProps extends TextInputProps {
  iconRight?: React.ReactNode;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  iconRight,
  style,
  secureTextEntry,
  error,
  ...props
}) => {
  const isPassword = !!secureTextEntry;

  return (
    <View style={styles.inputWrapper}>
      <RNTextInput
        style={[
          styles.input,
          style,
          iconRight ? { paddingRight: 45 } : null,
          error ? styles.inputError : null,
        ]}
        placeholderTextColor={TextColors.gray}
        secureTextEntry={secureTextEntry}
        autoComplete="off"
        textContentType={
          Platform.OS === "ios" ? (isPassword ? "oneTimeCode" : "none") : undefined
        }
        importantForAutofill="no"
        {...props}
      />

      {iconRight && <View style={styles.iconRight}>{iconRight}</View>}
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    position: "relative",
    justifyContent: "center",
    marginBottom: 25,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 8,
    paddingRight: 10,
    fontSize: 15,
    color: "#000",
    lineHeight: 20,
  },
  inputError: {
    borderColor: "#d64545",
  },
  iconRight: {
    position: "absolute",
    right: 10,
    top: 0,
    bottom: 18,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    elevation: 5,
  },
  errorText: {
    color: "#d64545",
    fontSize: 12,
    marginTop: 6,
  },
});

export default FormInput;
