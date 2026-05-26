import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { StackScreens } from "@/configs/navigations/screens";

const RegisterStepThreeLayout = () => {
  const navigation: any = useNavigation();

  useEffect(() => {
    navigation.replace(StackScreens.registerFinalStep);
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

export default RegisterStepThreeLayout;
