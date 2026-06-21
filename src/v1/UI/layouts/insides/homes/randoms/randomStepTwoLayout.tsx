import { db, firebaseAuth } from "firebase/firebaseConfig";
import styles from "src/assets/styles/tabStyles/homeStyles/randomStyles/randomStepTwo.styles";
import * as DocumentPicker from "expo-document-picker";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import ButtonForm from "../../../../components/ButtonForm";
import FormInput from "../../../../components/FormInput";
import HeaderTabs from "../../../../components/Header";
import UploadPickerField, {
  SelectedUploadFile,
} from "../../../../components/UploadPickerField";
import { StackScreens } from "@/configs/navigations/screens";
import {
  getEmployerByCompanyName,
  getEmployerByEmployerCode,
  normalizeEmployerCode,
} from "@/v1/logics/services/employerService";
import { getDriverPrefillData } from "@/v1/logics/services/prefillService";

type RouteParams = {
  company?: string;
  companyCode?: string;
};

const RandomStepTwoLayout = () => {
  const route = useRoute();
  const { company = "", companyCode: routeCompanyCode = "" } =
    (route.params as RouteParams) ?? {};

  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [driverLicense, setDriverLicense] = useState("");
  const [today, setToday] = useState(() => new Date().toISOString().slice(0, 10));
  const [companyName, setCompanyName] = useState(company);
  const [companyCode, setCompanyCode] = useState(routeCompanyCode);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [actualAlt, setActualAlt] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [collectionDate, setCollectionDate] = useState("");
  const [pickedFile, setPickedFile] = useState<SelectedUploadFile | null>(null);
  const [statusText, setStatusText] = useState(
    "We will prefill driver and company data from Firebase where available."
  );
  const [statusTone, setStatusTone] = useState<"neutral" | "success" | "warning">("neutral");

  useEffect(() => {
    let active = true;

    const loadPrefill = async () => {
      try {
        const prefill = await getDriverPrefillData();
        if (!active || !prefill) return;

        setDriverLicense((current) => current || prefill.driverLicenseNumber || prefill.license);
        setFirstName((current) => current || prefill.driverFirstName);
        setLastName((current) => current || prefill.driverLastName);
        setCompanyName((current) => current || company || prefill.companyName);
        setCompanyCode((current) =>
          current || routeCompanyCode || prefill.employerCode || ""
        );

        setStatusText(
          prefill.employerCode || prefill.driverFirstName
            ? "Driver and employer data were prefilled from your account."
            : "Enter the remaining details to complete this random form."
        );
        setStatusTone(prefill.employerCode || prefill.driverFirstName ? "success" : "neutral");
      } catch (error) {
        console.error("Random step 2 prefill error:", error);
      }
    };

    loadPrefill();

    return () => {
      active = false;
    };
  }, [company, routeCompanyCode]);

  useEffect(() => {
    const normalizedCode = normalizeEmployerCode(companyCode || "");

    if (!normalizedCode && !companyName.trim()) {
      return;
    }

    let active = true;
    const timeout = setTimeout(async () => {
      try {
        let employerData: any = null;

        if (normalizedCode) {
          employerData = await getEmployerByEmployerCode(normalizedCode);
        }

        if (!employerData && companyName.trim()) {
          employerData = await getEmployerByCompanyName(companyName);
        }

        if (!active) return;

        if (employerData) {
          setCompanyName((current) => current || employerData.companyName || company);
          setCompanyCode((current) =>
            current || employerData.employerCode || employerData.code || ""
          );
          setStatusText(
            employerData.employerCode || employerData.code
              ? `Company details loaded from Firebase. Code: ${normalizeEmployerCode(String(employerData.employerCode || employerData.code))}`
              : "Company details loaded from Firebase."
          );
          setStatusTone("success");
        } else if (normalizedCode) {
          setStatusText(
            `No employer match found for code ${normalizedCode}. You can still submit manually.`
          );
          setStatusTone("warning");
        } else {
          setStatusText(
            "This company does not have a code in the companies collection yet. Add companyCode there or employerCode in employers to auto-fill it."
          );
          setStatusTone("warning");
        }
      } catch (error) {
        console.error("Random step 2 employer lookup error:", error);
        if (active) {
          setStatusText("We could not verify that company information right now.");
          setStatusTone("warning");
        }
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [company, companyCode, companyName]);

  const submitForm = async () => {
    const user = firebaseAuth.currentUser;

    if (!user) {
      Alert.alert("Error", "Bạn chưa đăng nhập!");
      return;
    }

    if (
      !companyName.trim() ||
      !driverLicense.trim() ||
      !companyCode.trim() ||
      !firstName.trim() ||
      !lastName.trim()
    ) {
      Alert.alert("Error", "Please complete the required fields");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "randomForms"), {
        userId: user.uid,
        companyName: companyName.trim(),
        driverLicense: driverLicense.trim().toUpperCase(),
        todayDate: today.trim(),
        companyCode: normalizeEmployerCode(companyCode),
        driverFirstName: firstName.trim(),
        driverLastName: lastName.trim(),
        actualAlternative: actualAlt.trim(),
        expireDate: expireDate.trim(),
        selectedDate: selectedDate.trim(),
        collectionDate: collectionDate.trim(),
        fileName: pickedFile?.name || null,
        fileUri: pickedFile?.uri || null,
        createdAt: serverTimestamp(),
      });

      console.log("Saved to Firestore with ID:", docRef.id);
      Alert.alert("Success", "Form đã lưu lên Firebase!", [
        {
          text: "OK",
          onPress: () => navigation.navigate(StackScreens.home),
        },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Không thể lưu dữ liệu!");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Random Step 2" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 2 of 2</Text>
            </View>
            <Text style={styles.sectionTitle}>Random Form Details</Text>
            <Text style={styles.helperText}>
              Complete the driver and collection details for the selected company before submitting the form.
            </Text>
            {!!companyName && (
              <View style={styles.companyPill}>
                <Text style={styles.companyPillText}>{companyName}</Text>
              </View>
            )}
          </View>

          <View style={styles.formCard}>
            <View
              style={[
                styles.statusCard,
                statusTone === "success"
                  ? styles.statusCardSuccess
                  : statusTone === "warning"
                    ? styles.statusCardWarning
                    : null,
              ]}
            >
              <Text style={styles.statusText}>{statusText}</Text>
            </View>

            <Text style={styles.label}>{t("random_status")}</Text>
            <FormInput value={t("random_testing")} editable={false} />

            <FormInput
              placeholder={t("driver_license_number")}
              value={driverLicense}
              onChangeText={setDriverLicense}
              autoCapitalize="characters"
            />

            <FormInput placeholder={t("today")} value={today} onChangeText={setToday} />

            <FormInput
              placeholder={t("company_name")}
              value={companyName}
              onChangeText={setCompanyName}
            />

            <FormInput
              placeholder={t("company_code")}
              value={companyCode}
              onChangeText={setCompanyCode}
              autoCapitalize="characters"
            />

            <FormInput
              placeholder={t("driver_first_name")}
              value={firstName}
              onChangeText={setFirstName}
            />

            <FormInput
              placeholder={t("driver_last_name")}
              value={lastName}
              onChangeText={setLastName}
            />

            <FormInput
              placeholder={t("actual_or_alternative")}
              value={actualAlt}
              onChangeText={setActualAlt}
            />

            <FormInput
              placeholder={t("expire_day")}
              value={expireDate}
              onChangeText={setExpireDate}
            />

            <FormInput
              placeholder={t("selected_date")}
              value={selectedDate}
              onChangeText={setSelectedDate}
            />

            <FormInput
              placeholder={t("collection_date")}
              value={collectionDate}
              onChangeText={setCollectionDate}
            />

            <Text style={styles.label}>{t("attachment")}</Text>
            <UploadPickerField
              buttonText={t("pick_pdf_file_optional")}
              hint="PDF or image attachment"
              allowedTypes={["application/pdf", "image/*"]}
              file={pickedFile}
              onChange={setPickedFile}
            />

            <ButtonForm onPress={submitForm} text={t("submit")} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RandomStepTwoLayout;
