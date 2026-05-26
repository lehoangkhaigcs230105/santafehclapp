import styles from "src/assets/styles/tabStyles/homeStyles/drugTestStyles/drugTestStepThree.styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, Alert, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import ButtonForm from "../../../../components/ButtonForm";
import FormInput from "../../../../components/FormInput";
import HeaderTabs from "../../../../components/Header";

import { StackScreens } from "@/configs/navigations/screens";
import { getDriverPrefillData } from "@/v1/logics/services/prefillService";

const DrugTestStepThreeLayout = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [ccf, setCcf] = useState("");
  const [driverFirstName, setDriverFirstName] = useState("");
  const [driverLastName, setDriverLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [driverEmail, setDriverEmail] = useState("");
  const [driverStateLicenseIssue, setDriverStateLicenseIssue] = useState("");
  const [driverCity, setDriverCity] = useState("");
  const [driverState, setDriverState] = useState("");
  const [driverZip, setDriverZip] = useState("");

  useEffect(() => {
    const loadPrefill = async () => {
      try {
        const prefill = await getDriverPrefillData();
        if (!prefill) return;
        setDriverFirstName((current) => current || prefill.driverFirstName);
        setDriverLastName((current) => current || prefill.driverLastName);
        setDateOfBirth((current) => current || prefill.dateOfBirth);
        setDriverPhone((current) => current || prefill.driverPhone);
        setDriverEmail((current) => current || prefill.driverEmail);
        setDriverStateLicenseIssue((current) => current || prefill.driverStateLicenseIssue);
        setDriverCity((current) => current || prefill.driverCity);
        setDriverState((current) => current || prefill.driverState);
        setDriverZip((current) => current || prefill.driverZip);
      } catch (error) {
        console.error("Drug test step 3 prefill error:", error);
      }
    };

    loadPrefill();
  }, []);

  const pushToNext = () => {
    if (!driverFirstName.trim() || !driverLastName.trim() || !driverPhone.trim()) {
      Alert.alert("Error", "Please complete the driver information");
      return;
    }

    navigation.navigate(StackScreens.drugTestFinalStep);
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Drug Test Step 3" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 3 of 4</Text>
            </View>
            <Text style={styles.sectionTitle}>Driver Information</Text>
            <Text style={styles.helperText}>
              Complete the driver profile details that belong to this drug test request.
            </Text>
          </View>

          <View style={styles.formCard}>
            <FormInput placeholder={t("ccf")} value={ccf} onChangeText={setCcf} />
            <FormInput placeholder={t("driver_first_name")} value={driverFirstName} onChangeText={setDriverFirstName} />
            <FormInput placeholder={t("driver_last_name")} value={driverLastName} onChangeText={setDriverLastName} />
            <FormInput placeholder={t("date_of_birth")} value={dateOfBirth} onChangeText={setDateOfBirth} />
            <FormInput placeholder={t("driver_phone")} value={driverPhone} onChangeText={setDriverPhone} keyboardType="phone-pad" />
            <FormInput placeholder={t("driver_email")} value={driverEmail} onChangeText={setDriverEmail} keyboardType="email-address" autoCapitalize="none" />
            <FormInput placeholder={t("driver_state_license_issue")} value={driverStateLicenseIssue} onChangeText={setDriverStateLicenseIssue} />
            <FormInput placeholder={t("driver_city")} value={driverCity} onChangeText={setDriverCity} />

            <View style={styles.row}>
              <View style={styles.smallField}>
                <FormInput placeholder={t("driver_state")} value={driverState} onChangeText={setDriverState} />
              </View>
              <View style={styles.smallField}>
                <FormInput placeholder={t("driver_zip")} value={driverZip} onChangeText={setDriverZip} keyboardType="number-pad" />
              </View>
            </View>

            <ButtonForm onPress={pushToNext} text={t("next")} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DrugTestStepThreeLayout;
