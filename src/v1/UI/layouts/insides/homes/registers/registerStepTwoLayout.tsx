import styles from "src/assets/styles/tabStyles/homeStyles/registerStyles/registerStepTwo.styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ButtonForm from "../../../../components/ButtonForm";
import FormInput from "../../../../components/FormInput";
import HeaderTabs from "../../../../components/Header";

import { StackScreens } from "@/configs/navigations/screens";
import {
  getDriverRegister,
  getEmployerByEmployerCode,
  updateDriverRegisterStepTwo,
} from "@/v1/logics/services/driverRegister.service";

const RegisterStepTwoLayout = () => {
  const { t } = useTranslation();
  const navigation: any = useNavigation();

  const [code, setCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [companyCity, setCompanyCity] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyState, setCompanyState] = useState("");
  const [companyZip, setCompanyZip] = useState("");
  const [usdot, setUsdot] = useState("");
  const [mcNumber, setMcNumber] = useState("");
  const [derFirstName, setDerFirstName] = useState("");
  const [derLastName, setDerLastName] = useState("");
  const [dateOfEnrollment, setDateOfEnrollment] = useState("");
  const [dateOfExpiration, setDateOfExpiration] = useState("");

  useEffect(() => {
    const loadEmployerData = async () => {
      try {
        const registerData: any = await getDriverRegister();

        if (!registerData?.employerCode) {
          Alert.alert("Notice", "Employer code is missing from step 1");
          return;
        }

        setCode(registerData.employerCode);

        const employerData: any = await getEmployerByEmployerCode(
          registerData.employerCode
        );

        if (!employerData) {
          Alert.alert("Notice", "Employer code not found");
          return;
        }

        setCompanyName(employerData.companyName || "");
        setCompanyAddress(employerData.companyAddress || "");
        setCompanyEmail(employerData.companyEmail || "");
        setCompanyState(employerData.companyState || "");
        setCompanyZip(employerData.companyZip || "");
        setUsdot(employerData.usdot || "");
        setMcNumber(employerData.mcNumber || "");
        setDerFirstName(employerData.derFirstName || "");
        setDerLastName(employerData.derLastName || "");
        setCompanyCity(employerData.companyCity || "");
      } catch (error) {
        console.error("Load employer data error:", error);
      }
    };

    loadEmployerData();
  }, []);

  const pushToRegisterFinalStep = async () => {
    if (!code.trim() || !companyName.trim()) {
      Alert.alert("Error", "Please complete the company information");
      return;
    }

    try {
      await updateDriverRegisterStepTwo({
        code,
        companyName,
        driverPhone,
        companyCity,
        companyAddress,
        companyEmail,
        companyState,
        companyZip,
        usdot,
        mcNumber,
        derFirstName,
        derLastName,
        dateOfEnrollment,
        dateOfExpiration,
      });

      navigation.navigate(StackScreens.registerFinalStep);
    } catch (error) {
      console.error("Driver register step 2 error:", error);
      Alert.alert("Error", "Cannot save company data");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Register Step 2" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 2 of 3</Text>
            </View>
            <Text style={styles.sectionTitle}>Company Information</Text>
            <Text style={styles.helperText}>
              We prefilled this section from your employer code. You can review and adjust anything before continuing.
            </Text>
          </View>

          <View style={styles.formCard}>
            <FormInput placeholder={t("code")} value={code} onChangeText={setCode} />

            <FormInput
              placeholder={t("company_name")}
              value={companyName}
              onChangeText={setCompanyName}
            />

            <FormInput
              placeholder={t("driver_phone")}
              value={driverPhone}
              onChangeText={setDriverPhone}
              keyboardType="phone-pad"
            />

            <FormInput
              placeholder={t("company_city")}
              value={companyCity}
              onChangeText={setCompanyCity}
            />

            <FormInput
              placeholder={t("company_address")}
              value={companyAddress}
              onChangeText={setCompanyAddress}
            />

            <FormInput
              placeholder={t("company_email")}
              value={companyEmail}
              onChangeText={setCompanyEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.row}>
              <View style={styles.smallField}>
                <FormInput
                  placeholder={t("company_state")}
                  value={companyState}
                  onChangeText={setCompanyState}
                />
              </View>

              <View style={styles.smallField}>
                <FormInput
                  placeholder={t("company_zip")}
                  value={companyZip}
                  onChangeText={setCompanyZip}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.smallField}>
                <FormInput
                  placeholder={t("usdot")}
                  value={usdot}
                  onChangeText={setUsdot}
                />
              </View>

              <View style={styles.smallField}>
                <FormInput
                  placeholder={t("mc_number")}
                  value={mcNumber}
                  onChangeText={setMcNumber}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.smallField}>
                <FormInput
                  placeholder={t("der_first_name")}
                  value={derFirstName}
                  onChangeText={setDerFirstName}
                />
              </View>

              <View style={styles.smallField}>
                <FormInput
                  placeholder={t("der_last_name")}
                  value={derLastName}
                  onChangeText={setDerLastName}
                />
              </View>
            </View>

            <FormInput
              placeholder={t("date_of_enrollment")}
              value={dateOfEnrollment}
              onChangeText={setDateOfEnrollment}
            />

            <FormInput
              placeholder={t("date_of_expiration")}
              value={dateOfExpiration}
              onChangeText={setDateOfExpiration}
            />

            <Text style={styles.label}>{t("file_upload_optional")}</Text>
            <TouchableOpacity style={styles.uploadBox}>
              <Text style={styles.uploadText}>{t("upload_photo")}</Text>
              <Text style={styles.uploadHint}>PNG, JPG or PDF</Text>
            </TouchableOpacity>

            <ButtonForm onPress={pushToRegisterFinalStep} text={t("next")} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterStepTwoLayout;
