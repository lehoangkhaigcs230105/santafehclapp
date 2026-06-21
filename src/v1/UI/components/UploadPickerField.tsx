import { Ionicons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type SelectedUploadFile = {
  uri: string;
  name: string;
  mimeType?: string;
  size?: number;
};

type UploadPickerFieldProps = {
  buttonText: string;
  hint?: string;
  allowedTypes?: string | string[];
  file?: SelectedUploadFile | null;
  onChange: (file: SelectedUploadFile | null) => void;
};

const formatFileSize = (size?: number) => {
  if (!size || size <= 0) return null;
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
};

const UploadPickerField: React.FC<UploadPickerFieldProps> = ({
  buttonText,
  hint,
  allowedTypes = ["application/pdf", "image/*"],
  file,
  onChange,
}) => {
  const handlePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: allowedTypes,
        copyToCacheDirectory: true,
        multiple: false,
      });

      if (result.canceled) {
        return;
      }

      const picked = result.assets[0];
      onChange({
        uri: picked.uri,
        name: picked.name,
        mimeType: picked.mimeType,
        size: picked.size,
      });
    } catch (error) {
      console.error("Upload picker error:", error);
      Alert.alert("Error", "Unable to pick a file right now.");
    }
  };

  const fileSize = formatFileSize(file?.size);

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity activeOpacity={0.86} onPress={handlePick} style={styles.uploadBox}>
        <View style={styles.iconBadge}>
          <Ionicons name="document-attach-outline" size={18} color="#29415d" />
        </View>

        <Text style={styles.buttonText}>{file?.name || buttonText}</Text>

        {!!hint && !file && <Text style={styles.hint}>{hint}</Text>}
        {!!file && (
          <Text style={styles.metaText}>
            {[file.mimeType, fileSize].filter(Boolean).join(" • ") || "Selected file"}
          </Text>
        )}
      </TouchableOpacity>

      {!!file && (
        <TouchableOpacity activeOpacity={0.8} onPress={() => onChange(null)} style={styles.clearButton}>
          <Ionicons name="close-circle-outline" size={16} color="#a34949" />
          <Text style={styles.clearText}>Remove file</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UploadPickerField;

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },
  uploadBox: {
    minHeight: 88,
    backgroundColor: "#f8fbff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#cad7e8",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  iconBadge: {
    alignItems: "center",
    backgroundColor: "#e9f0fb",
    borderRadius: 999,
    height: 34,
    justifyContent: "center",
    marginBottom: 10,
    width: 34,
  },
  buttonText: {
    color: "#314b69",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },
  hint: {
    marginTop: 6,
    color: "#8092a8",
    fontSize: 12,
    textAlign: "center",
  },
  metaText: {
    marginTop: 6,
    color: "#627a95",
    fontSize: 12,
    textAlign: "center",
  },
  clearButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: 6,
    marginTop: 10,
  },
  clearText: {
    color: "#a34949",
    fontSize: 12,
    fontWeight: "700",
  },
});
