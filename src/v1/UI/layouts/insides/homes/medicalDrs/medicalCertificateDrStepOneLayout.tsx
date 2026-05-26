import styles from "src/assets/styles/tabStyles/homeStyles/medicalCertificateDrStyles/medicalCertificateDrStepOne.styles";
import ButtonForm from "src/v1/UI/components/ButtonForm";
import FormInput from "src/v1/UI/components/FormInput";
import HeaderTabs from "src/v1/UI/components/Header";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackScreens } from "@/configs/navigations/screens";
import { getDriverPrefillData } from "@/v1/logics/services/prefillService";

const MedicalCertificateDrStepOneLayout = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [driverFirstName, setDriverFirstName] = useState("");
  const [driverLastName, setDriverLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [driverLicenseNumber, setDriverLicenseNumber] = useState("");
  const [address, setAddress] = useState("");
  const [driverState, setDriverState] = useState("");
  const [driverZip, setDriverZip] = useState("");
  const [city, setCity] = useState("");
  const [certificateSignedDate, setCertificateSignedDate] = useState("");
  const [certificateExpirationDate, setCertificateExpirationDate] = useState("");
  const [witness, setWitness] = useState("");

  useEffect(() => {
    const loadPrefill = async () => {
      try {
        const prefill = await getDriverPrefillData();
        if (!prefill) return;
        setDriverFirstName((current) => current || prefill.driverFirstName);
        setDriverLastName((current) => current || prefill.driverLastName);
        setDateOfBirth((current) => current || prefill.dateOfBirth);
        setPhone((current) => current || prefill.driverPhone);
        setDriverLicenseNumber((current) => current || prefill.driverLicenseNumber || prefill.license);
        setAddress((current) => current || prefill.driverAddress);
        setDriverState((current) => current || prefill.driverState);
        setDriverZip((current) => current || prefill.driverZip);
        setCity((current) => current || prefill.driverCity);
      } catch (error) {
        console.error("Medical examiner step 1 prefill error:", error);
      }
    };

    loadPrefill();
  }, []);

  const pushToMedicalCertificateDrStepTwo = () => {
    if (!driverFirstName.trim() || !driverLastName.trim() || !driverLicenseNumber.trim()) {
      Alert.alert("Error", "Please complete the driver details");
      return;
    }

    navigation.navigate(StackScreens.medicalCertificateDrStepTwo);
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Medical Examiner Step 1" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{t("medical_examiner_certificate")}</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.fieldWrapper}>
            <FormInput placeholder={t("driver_first_name")} value={driverFirstName} onChangeText={setDriverFirstName} />
            <FormInput placeholder={t("driver_last_name")} value={driverLastName} onChangeText={setDriverLastName} />
            <FormInput placeholder={t("date_of_birth")} value={dateOfBirth} onChangeText={setDateOfBirth} />
            <FormInput placeholder={t("phone")} value={phone} onChangeText={setPhone} />
            <FormInput placeholder={t("driver_license_number")} value={driverLicenseNumber} onChangeText={setDriverLicenseNumber} />
            <FormInput placeholder={t("address")} value={address} onChangeText={setAddress} />
          </View>

          <View style={styles.row}>
            <View style={styles.halfField}>
              <FormInput placeholder={t("driver_state")} value={driverState} onChangeText={setDriverState} />
            </View>
            <View style={styles.halfField}>
              <FormInput placeholder={t("driver_zip")} value={driverZip} onChangeText={setDriverZip} />
            </View>
          </View>

          <View style={styles.fieldWrapper}>
            <FormInput placeholder={t("city")} value={city} onChangeText={setCity} />
          </View>

          <Text style={styles.warning}>{t("review_before_signing")}</Text>

          <View style={styles.signatureBox}>
            <Text style={styles.signatureText}>{t("sign_here")}</Text>
          </View>

          <View style={styles.fieldWrapper}>
            <FormInput placeholder={t("certificate_signed_date")} value={certificateSignedDate} onChangeText={setCertificateSignedDate} />
            <FormInput placeholder={t("certificate_expiration_date")} value={certificateExpirationDate} onChangeText={setCertificateExpirationDate} />
            <FormInput placeholder={t("witness")} value={witness} onChangeText={setWitness} />
          </View>

          <ButtonForm text={t("next")} onPress={pushToMedicalCertificateDrStepTwo} />
        </View>
      </ScrollView>
    </View>
  );
};

export default MedicalCertificateDrStepOneLayout;
