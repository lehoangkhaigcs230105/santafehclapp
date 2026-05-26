import { BackgroundColors, TextColors } from "@/configs/constants/color";
import { checkNetwork, subscribeToNetwork } from "@/v1/logics/hooks/NetworkManager";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface Props {
  children: React.ReactNode;
}

const NetworkStatusWrapper: React.FC<Props> = ({ children }) => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  useEffect(() => {
    setIsConnected(checkNetwork());

    const unsubscribe = subscribeToNetwork((connected) => {
      setIsConnected(connected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (!isConnected) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.text}>Không có kết nối mạng. Vui lòng kiểm tra lại!</Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: BackgroundColors.white,
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    color: TextColors.red,
  },
});

export default NetworkStatusWrapper;
