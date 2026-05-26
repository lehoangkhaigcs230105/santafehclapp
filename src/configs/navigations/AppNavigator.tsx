import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import StackNavigator from "@/configs/navigations/StackNavigator";
import { AlertProvider } from "@/v1/logics/contexts/AlertContext";
import AuthProvider from "@/v1/logics/contexts/AuthContext";

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <AlertProvider>
        <AuthProvider>
          <StackNavigator />
        </AuthProvider>
      </AlertProvider>
    </NavigationContainer>
  );
}
