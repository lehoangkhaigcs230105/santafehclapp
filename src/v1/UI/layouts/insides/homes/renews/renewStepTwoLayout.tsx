import styles from "src/assets/styles/tabStyles/homeStyles/renewStyles/renewStepTwo.styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import ButtonForm from "../../../../components/ButtonForm";
import FormInput from "../../../../components/FormInput";
import HeaderTabs from "../../../../components/Header";

import { StackScreens } from "@/configs/navigations/screens";
import {
  getEmployerByEmployerCode,
  normalizeEmployerCode,
} from "@/v1/logics/services/employerService";
import { getDriverPrefillData } from "@/v1/logics/services/prefillService";

const RenewStepTwoLayout = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();

  const [code, setCode] = useState(route.params?.employerCode ?? "");
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
  const [lookupStatus, setLookupStatus] = useState(
    "Paste the employer code to auto-fill the company details from Firebase."
  );
  const [lookupTone, setLookupTone] = useState<"neutral" | "success" | "warning">("neutral");

  useEffect(() => {
    let active = true;

    const loadPrefill = async () => {
      try {
        const prefill = await getDriverPrefillData();
        if (!active || !prefill?.employerCode) {
          return;
        }

        setCode((current) => current || prefill.employerCode);
      } catch (error) {
        console.error("Renew step 2 prefill error:", error);
      }
    };

    loadPrefill();

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const normalizedCode = normalizeEmployerCode(code || "");
    if (!normalizedCode) {
      return;
    }

    let active = true;
    const timeout = setTimeout(async () => {
      try {
        const employerData: any = await getEmployerByEmployerCode(normalizedCode);
        if (!active) {
          return;
        }

        if (!employerData) {
          setLookupStatus(
            `No employer was found for code ${normalizedCode}. You can continue by filling the fields manually.`
          );
          setLookupTone("warning");
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
        setLookupStatus(`Employer code ${normalizedCode} matched and auto-filled successfully.`);
        setLookupTone("success");
      } catch (error) {
        console.error("Renew employer auto-fill error:", error);
        if (active) {
          setLookupStatus("Unable to verify that employer code right now.");
          setLookupTone("warning");
        }
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [code]);

  const pushToRenewStepThree = () => {
    if (!code.trim() || !companyName.trim()) {
      Alert.alert("Error", "Please complete the company information");
      return;
    }

    navigation.navigate(StackScreens.renewStepThree);
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Renew Step 2" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 2 of 4</Text>
            </View>
            <Text style={styles.sectionTitle}>Employer Details</Text>
            <Text style={styles.helperText}>
              Paste the company code to auto-fill employer information, then review anything that has changed.
            </Text>
          </View>

          <View style={styles.formCard}>
            <View
              style={[
                styles.statusCard,
                lookupTone === "success"
                  ? styles.statusCardSuccess
                  : lookupTone === "warning"
                    ? styles.statusCardWarning
                    : null,
              ]}
            >
              <Text style={styles.statusText}>{lookupStatus}</Text>
            </View>

            <FormInput
              placeholder={t("code")}
              value={code}
              onChangeText={setCode}
              autoCapitalize="characters"
            />
            <FormInput placeholder={t("company_name")} value={companyName} onChangeText={setCompanyName} />
            <FormInput
              placeholder={t("driver_phone")}
              value={driverPhone}
              onChangeText={setDriverPhone}
              keyboardType="phone-pad"
            />
            <FormInput placeholder={t("company_city")} value={companyCity} onChangeText={setCompanyCity} />
            <FormInput placeholder={t("company_address")} value={companyAddress} onChangeText={setCompanyAddress} />
            <FormInput
              placeholder={t("company_email")}
              value={companyEmail}
              onChangeText={setCompanyEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.row}>
              <View style={styles.smallField}>
                <FormInput placeholder={t("company_state")} value={companyState} onChangeText={setCompanyState} />
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
                <FormInput placeholder={t("usdot")} value={usdot} onChangeText={setUsdot} />
              </View>
              <View style={styles.smallField}>
                <FormInput placeholder={t("mc_number")} value={mcNumber} onChangeText={setMcNumber} />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.smallField}>
                <FormInput placeholder={t("der_first_name")} value={derFirstName} onChangeText={setDerFirstName} />
              </View>
              <View style={styles.smallField}>
                <FormInput placeholder={t("der_last_name")} value={derLastName} onChangeText={setDerLastName} />
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
              <Text style={styles.uploadHint}>Upload renewal attachment if needed</Text>
            </TouchableOpacity>

            <ButtonForm onPress={pushToRenewStepThree} text={t("next")} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RenewStepTwoLayout;
