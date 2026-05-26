import styles from "src/assets/styles/tabStyles/homeStyles/registerStyles/registerStepOne.styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ButtonForm from "../../../../components/ButtonForm";
import FormInput from "../../../../components/FormInput";
import HeaderTabs from "../../../../components/Header";

import { StackScreens } from "@/configs/navigations/screens";
import { createDriverRegisterStepOne } from "@/v1/logics/services/driverRegister.service";

const RegisterStepOneLayout = () => {
  const { t } = useTranslation();
  const navigation: any = useNavigation();

  const [status, setStatus] = useState("");
  const [plan, setPlan] = useState("");
  const [employerCode, setEmployerCode] = useState("");
  const [license, setLicense] = useState("");

  const pushToRegisterStepTwo = async () => {
    if (!status.trim() || !plan.trim() || !employerCode.trim() || !license.trim()) {
      Alert.alert("Error", "Please complete all required fields");
      return;
    }

    try {
      await createDriverRegisterStepOne({
        status,
        plan,
        employerCode,
        license,
      });

      navigation.navigate(StackScreens.registerStepTwo);
    } catch (error) {
      console.error("Driver register step 1 error:", error);
      Alert.alert("Error", "Cannot save data");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Register Step 1" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 1 of 3</Text>
            </View>
            <Text style={styles.sectionTitle}>Driver Setup</Text>
            <Text style={styles.helperText}>
              Add your registration basics first. Your employer code will be used to load company details in the next step.
            </Text>
          </View>

          <View style={styles.formCard}>
            <FormInput
              placeholder={t("status_register")}
              value={status}
              onChangeText={setStatus}
            />

            <FormInput
              placeholder={t("plan_section")}
              value={plan}
              onChangeText={setPlan}
            />

            <FormInput
              placeholder={t("employer_code_company")}
              value={employerCode}
              onChangeText={setEmployerCode}
              autoCapitalize="characters"
            />

            <FormInput
              placeholder={t("client_your_license")}
              value={license}
              onChangeText={setLicense}
              autoCapitalize="characters"
            />

            <ButtonForm onPress={pushToRegisterStepTwo} text={t("next")} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterStepOneLayout;
