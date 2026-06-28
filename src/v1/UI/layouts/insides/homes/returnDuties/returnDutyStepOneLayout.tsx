import styles from "src/assets/styles/tabStyles/homeStyles/returnDutyStyles/returnDutyStepOne.styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonForm from "../../../../components/ButtonForm";
import FormInput from "../../../../components/FormInput";
import HeaderTabs from "../../../../components/Header";
import { StackScreens } from "@/configs/navigations/screens";
import { getDriverPrefillData } from "@/v1/logics/services/prefillService";

const ReturnDutyStepOneLayout = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [status, setStatus] = useState("");
  const [plan, setPlan] = useState("");
  const [employerCode, setEmployerCode] = useState("");
  const [license, setLicense] = useState("");

  useEffect(() => {
    const loadPrefill = async () => {
      try {
        const prefill = await getDriverPrefillData();
        if (!prefill) return;

        setLicense((current) => current || prefill.license || prefill.driverLicenseNumber);
      } catch (error) {
        console.error("Return duty step 1 prefill error:", error);
      }
    };

    loadPrefill();
  }, []);

  const pushToReturnDutyStepTwo = () => {
    if (!status.trim() || !plan.trim() || !employerCode.trim() || !license.trim()) {
      Alert.alert("Error", "Please complete all required fields");
      return;
    }
    navigation.navigate(StackScreens.returnDutyStepTwo, {
      employerCode: employerCode.trim(),
    });
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Return Of Duty Step 1" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}><Text style={styles.stepBadgeText}>Step 1 of 4</Text></View>
            <Text style={styles.sectionTitle}>Return to Duty Basics</Text>
            <Text style={styles.helperText}>Start with the request details, then use the company code in the next step to auto-fill employer information.</Text>
          </View>
          <View style={styles.formCard}>
            <FormInput placeholder={t('status_return_of_duty')} value={status} onChangeText={setStatus} />
            <FormInput placeholder={t('plan_section')} value={plan} onChangeText={setPlan} />
            <FormInput placeholder={t('employer_code_company')} value={employerCode} onChangeText={setEmployerCode} autoCapitalize="characters" />
            <FormInput placeholder={t('client_your_license')} value={license} onChangeText={setLicense} autoCapitalize="characters" />
            <ButtonForm onPress={pushToReturnDutyStepTwo} text={t('next')} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ReturnDutyStepOneLayout;
