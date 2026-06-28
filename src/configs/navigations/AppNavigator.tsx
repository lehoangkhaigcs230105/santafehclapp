import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import StackNavigator from "@/configs/navigations/StackNavigator";
import GlobalLanguageSwitcher from "@/v1/UI/components/GlobalLanguageSwitcher";
import { AlertProvider } from "@/v1/logics/contexts/AlertContext";
import AuthProvider from "@/v1/logics/contexts/AuthContext";
import { applySavedLanguage } from "@/v1/logics/services/LanguageService";

export default function AppNavigator() {
  useEffect(() => {
    applySavedLanguage();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={["top", "right", "bottom", "left"]}
        style={styles.safeArea}
      >
        <NavigationContainer>
          <AlertProvider>
            <AuthProvider>
              <StackNavigator />
              <GlobalLanguageSwitcher />
            </AuthProvider>
          </AlertProvider>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
