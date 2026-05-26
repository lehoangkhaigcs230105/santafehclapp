import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { setShowAlert } from "@/v1/logics/services/AlertService";

type AlertContextType = {
  showAlert: (title: string, message: string, buttons?: AlertButton[]) => void;
};

export type AlertButton = {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [buttons, setButtons] = useState<AlertButton[]>([
    { text: "OK", style: "default" },
  ]);

  const showAlert = (
    nextTitle: string,
    nextMessage: string,
    nextButtons: AlertButton[] = [{ text: "OK", style: "default" }]
  ) => {
    setTitle(nextTitle);
    setMessage(nextMessage);
    setButtons(nextButtons);
    setVisible(true);
  };

  useEffect(() => {
    setShowAlert(showAlert);
  }, []);

  const handlePress = (btn: AlertButton) => {
    setVisible(false);
    btn?.onPress?.();
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}

      <Modal transparent animationType="fade" visible={visible}>
        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.message}>{message}</Text>

            <View style={styles.buttonRow}>
              {buttons.map((btn, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => handlePress(btn)}
                  style={[
                    styles.button,
                    btn.style === "cancel" && styles.cancelButton,
                    btn.style === "destructive" && styles.destructiveButton,
                  ]}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      btn.style === "cancel" && styles.cancelText,
                      btn.style === "destructive" && styles.destructiveText,
                    ]}
                  >
                    {btn.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </Modal>
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error("useAlert must be used within AlertProvider");
  return context;
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 12,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#ccc",
  },
  cancelText: {
    color: "#333",
  },
  destructiveButton: {
    backgroundColor: "#dc3545",
  },
  destructiveText: {
    color: "#fff",
  },
});
