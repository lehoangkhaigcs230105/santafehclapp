import React from "react";
import AppNavigator from "./src/configs/navigations/AppNavigator";
import AuthProvider from "./src/v1/logics/contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
