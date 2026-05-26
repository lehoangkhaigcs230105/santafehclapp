import styles from "src/assets/styles/tabStyles/homeStyles/medicalCertificateStyles/medicalCertificateStepTwo.styles";
import ButtonForm from "src/v1/UI/components/ButtonForm";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import FormInput from "../../../../components/FormInput";
import HeaderTabs from "../../../../components/Header";
import { StackScreens } from "@/configs/navigations/screens";
import { getDriverPrefillData } from "@/v1/logics/services/prefillService";

const MedicalCertificateStepTwoLayout = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [driverFirstName, setDriverFirstName] = useState(route.params?.driverFirstName ?? "");
  const [driverLastName, setDriverLastName] = useState(route.params?.driverLastName ?? "");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [age, setAge] = useState("");
  const [driverAddress, setDriverAddress] = useState("");
  const [driverCity, setDriverCity] = useState("");
  const [driverLicenseNumber, setDriverLicenseNumber] = useState(route.params?.license ?? "");
  const [issuingState, setIssuingState] = useState("");
  const [driverState, setDriverState] = useState("");
  const [driverZip, setDriverZip] = useState("");
  const [cplDlc, setCplDlc] = useState("");
  const [medicalCertificate, setMedicalCertificate] = useState("");

  useEffect(() => {
    const loadPrefill = async () => {
      try {
        const prefill = await getDriverPrefillData();
        if (!prefill) return;
        setDriverFirstName((current) => current || prefill.driverFirstName);
        setDriverLastName((current) => current || prefill.driverLastName);
        setDateOfBirth((current) => current || prefill.dateOfBirth);
        setDriverAddress((current) => current || prefill.driverAddress);
        setDriverCity((current) => current || prefill.driverCity);
        setDriverLicenseNumber((current) => current || prefill.driverLicenseNumber || prefill.license);
        setIssuingState((current) => current || prefill.driverStateLicenseIssue);
        setDriverState((current) => current || prefill.driverState);
        setDriverZip((current) => current || prefill.driverZip);
      } catch (error) {
        console.error("Medical certificate step 2 prefill error:", error);
      }
    };

    loadPrefill();
  }, []);

  const pushToMedicalCertificateScreenStep3 = () => {
    if (!driverFirstName.trim() || !driverLastName.trim() || !driverLicenseNumber.trim()) {
      Alert.alert("Error", "Please complete the driver information");
      return;
    }

    navigation.navigate(StackScreens.medicalCertificateStepThree);
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Medical Certificate Step 2" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerBox}>
          <Text style={styles.headerText}>{t("section1_driver_info")}</Text>
        </View>

        <View style={styles.form}>
          <FormInput placeholder={t("driver_first_name")} value={driverFirstName} onChangeText={setDriverFirstName} />
          <FormInput placeholder={t("driver_last_name")} value={driverLastName} onChangeText={setDriverLastName} />
          <FormInput placeholder={t("date_of_birth")} value={dateOfBirth} onChangeText={setDateOfBirth} />
          <FormInput placeholder={t("age")} value={age} onChangeText={setAge} />
          <FormInput placeholder={t("driver_address")} value={driverAddress} onChangeText={setDriverAddress} />
          <FormInput placeholder={t("driver_city")} value={driverCity} onChangeText={setDriverCity} />
          <FormInput
            placeholder={t("driver_license_number")}
            value={driverLicenseNumber}
            onChangeText={setDriverLicenseNumber}
          />
          <FormInput placeholder={t("issuing_state")} value={issuingState} onChangeText={setIssuingState} />

          <View style={styles.row}>
            <View style={styles.smallField}>
              <FormInput placeholder={t("driver_state")} value={driverState} onChangeText={setDriverState} />
            </View>

            <View style={styles.smallField}>
              <FormInput placeholder={t("driver_zip")} value={driverZip} onChangeText={setDriverZip} />
            </View>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>{t("CPL/DLC_holder")}</Text>
            <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 4, marginTop: 4 }}>
              <Picker selectedValue={cplDlc} onValueChange={setCplDlc} style={styles.input}>
                <Picker.Item label={t("select")} value="" />
                <Picker.Item label={t("yes")} value="Yes" />
                <Picker.Item label={t("no")} value="No" />
              </Picker>
            </View>
          </View>

          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>{t("usdot_certificate_denied_less2years")}</Text>
            <View style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 4, marginTop: 4 }}>
              <Picker selectedValue={medicalCertificate} onValueChange={setMedicalCertificate} style={styles.input}>
                <Picker.Item label={t("select")} value="" />
                <Picker.Item label={t("yes")} value="Yes" />
                <Picker.Item label={t("no")} value="No" />
                <Picker.Item label={t("not_sure")} value="Not Sure" />
              </Picker>
            </View>
          </View>

          <ButtonForm onPress={pushToMedicalCertificateScreenStep3} text={t("next")} />
        </View>
      </ScrollView>
    </View>
  );
};

export default MedicalCertificateStepTwoLayout;
