import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";

import StackNavigator from "@/configs/navigations/StackNavigator";
import { AlertProvider } from "@/v1/logics/contexts/AlertContext";
import AuthProvider from "@/v1/logics/contexts/AuthContext";

export default function AppNavigator() {
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
