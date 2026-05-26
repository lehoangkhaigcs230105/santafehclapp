import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeLayout from "@/v1/UI/layouts/insides/homes/homeLayout";
import QuestionScreen from "@/v1/UI/layouts/insides/homes/question/questionLayout";
import EmployerScreen from "@/v1/UI/layouts/insides/homes/employers/employerLayout";
import PostAccidentStepOneScreen from "@/v1/UI/layouts/insides/homes/postAccidents/postAccidentStepOneLayout";
import MedicalCertificateDrStepOneScreen from "@/v1/UI/layouts/insides/homes/medicals/medicalCertificateQuestionListStepOneLayout";
import FollowUpStepOneScreen from "@/v1/UI/layouts/insides/homes/followUps/followUpStepOneLayout";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id="RootStack"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeLayout} />
        <Stack.Screen name="Question" component={QuestionScreen} />
        <Stack.Screen name="Employer" component={EmployerScreen} />
        <Stack.Screen
          name="PostAccidentStepOne"
          component={PostAccidentStepOneScreen}
        />
        <Stack.Screen
          name="MedicalCertificateDrStepOne"
          component={MedicalCertificateDrStepOneScreen}
        />
        <Stack.Screen
          name="FollowUpStepOne"
          component={FollowUpStepOneScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
