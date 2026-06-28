import styles from "src/assets/styles/tabStyles/homeStyles/renewStyles/renewStepOne.styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ButtonForm from "../../../../components/ButtonForm";
import FormInput from "../../../../components/FormInput";
import HeaderTabs from "../../../../components/Header";

import { StackScreens } from "@/configs/navigations/screens";
import { getDriverPrefillData } from "@/v1/logics/services/prefillService";

const RenewStepOneLayout = () => {
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
        console.error("Renew step 1 prefill error:", error);
      }
    };

    loadPrefill();
  }, []);

  const pushToRenewStepTwo = () => {
    if (!status.trim() || !plan.trim() || !employerCode.trim() || !license.trim()) {
      Alert.alert("Error", "Please complete all required fields");
      return;
    }

    navigation.navigate(StackScreens.renewStepTwo, {
      employerCode: employerCode.trim(),
    });
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Renew Step 1" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 1 of 4</Text>
            </View>
            <Text style={styles.sectionTitle}>Renewal Basics</Text>
            <Text style={styles.helperText}>
              Start with the renewal details so the next screens can focus on employer and driver information.
            </Text>
          </View>

          <View style={styles.formCard}>
            <FormInput placeholder={t('status_renew')} value={status} onChangeText={setStatus} />
            <FormInput placeholder={t('plan_section')} value={plan} onChangeText={setPlan} />
            <FormInput
              placeholder={t('employer_code_company')}
              value={employerCode}
              onChangeText={setEmployerCode}
              autoCapitalize="characters"
            />
            <FormInput
              placeholder={t('client_your_license')}
              value={license}
              onChangeText={setLicense}
              autoCapitalize="characters"
            />

            <ButtonForm onPress={pushToRenewStepTwo} text={t('next')} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RenewStepOneLayout;
