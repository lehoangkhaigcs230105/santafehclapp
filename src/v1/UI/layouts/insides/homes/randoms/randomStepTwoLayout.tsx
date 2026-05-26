import { db, firebaseAuth } from "firebase/firebaseConfig";
import styles from "src/assets/styles/tabStyles/homeStyles/randomStyles/randomStepTwo.styles";
import * as DocumentPicker from "expo-document-picker";

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";

import ButtonForm from "../../../../components/ButtonForm";
import FormInput from "../../../../components/FormInput";
import HeaderTabs from "../../../../components/Header";
import { StackScreens } from "@/configs/navigations/screens";

/* TYPE */
type RouteParams = {
  company: string;
};

type PickedFileType = {
  uri: string;
  name: string;
  type?: string;
  size?: number;
};

const RandomStepTwoLayout = () => {
  const route = useRoute();
  const { company } = route.params as RouteParams;

  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [driverLicense, setDriverLicense] = useState("");
  const [today, setToday] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [companyCode, setCompanyCode] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [actualAlt, setActualAlt] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [collectionDate, setCollectionDate] = useState("");
  const [pickedFile, setPickedFile] = useState<PickedFileType | null>(null);

  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });

    if (result.canceled) return;

    const file = result.assets[0];
    setPickedFile({
      uri: file.uri,
      name: file.name,
      type: file.mimeType,
      size: file.size,
    });
  };

  const submitForm = async () => {
    const user = firebaseAuth.currentUser;

    if (!user) {
      Alert.alert("Error", "Bạn chưa đăng nhập!");
      return;
    }

    if (
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
        companyName: company,
        driverLicense: driverLicense.trim(),
        todayDate: today.trim(),
        companyCode: companyCode.trim(),
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
            <View style={styles.companyPill}>
              <Text style={styles.companyPillText}>{company}</Text>
            </View>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>{t("random_status")}</Text>

            <FormInput value={t("random_testing")} editable={false} />

            <FormInput
              placeholder={t("driver_license_number")}
              value={driverLicense}
              onChangeText={setDriverLicense}
              autoCapitalize="characters"
            />

            <FormInput
              placeholder={t("today")}
              value={today}
              onChangeText={setToday}
            />

            <FormInput value={company} editable={false} />

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

            <TouchableOpacity onPress={pickFile} style={styles.uploadBox}>
              <Text style={styles.uploadText}>
                {pickedFile ? pickedFile.name : t("pick_pdf_file_optional")}
              </Text>
              <Text style={styles.uploadHint}>PDF only, optional</Text>
            </TouchableOpacity>

            <ButtonForm onPress={submitForm} text={t("submit")} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RandomStepTwoLayout;
