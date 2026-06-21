import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

import { firebaseAuth, db } from "firebase/firebaseConfig";
import styles from "@/assets/styles/tabStyles/homeStyles/employerStyles/employer.Styles";

import ButtonForm from "@/v1/UI/components/ButtonForm";
import FormInput from "@/v1/UI/components/FormInput";
import HeaderTabs from "@/v1/UI/components/Header";
import UploadPickerField, {
  SelectedUploadFile,
} from "@/v1/UI/components/UploadPickerField";

import { StackScreens } from "@/configs/navigations/screens";

const EmployerLayout = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [program, setProgram] = useState("");
  const [date, setDate] = useState("");
  const [code, setCode] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyState, setCompanyState] = useState("");
  const [companyZip, setCompanyZip] = useState("");
  const [usdot, setUsdot] = useState("");
  const [mcNumber, setMcNumber] = useState("");
  const [derFirstName, setDerFirstName] = useState("");
  const [derLastName, setDerLastName] = useState("");
  const [note, setNote] = useState("");
  const [attachment, setAttachment] = useState<SelectedUploadFile | null>(null);

  const submitToFirebase = async () => {
    const user = firebaseAuth.currentUser;

    if (!user) {
      Alert.alert("Error", "Bạn chưa đăng nhập!");
      return;
    }

    if (!code.trim() || !companyName.trim()) {
      Alert.alert("Error", "Please complete employer code and company name");
      return;
    }

    try {
      await addDoc(collection(db, "employers"), {
        userId: user.uid,
        program: program.trim(),
        date: date.trim(),
        code: code.trim(),
        employerCode: code.trim(),
        companyName: companyName.trim(),
        companyAddress: companyAddress.trim(),
        companyEmail: companyEmail.trim(),
        companyState: companyState.trim(),
        companyZip: companyZip.trim(),
        usdot: usdot.trim(),
        mcNumber: mcNumber.trim(),
        derFirstName: derFirstName.trim(),
        derLastName: derLastName.trim(),
        note: note.trim(),
        attachmentName: attachment?.name || null,
        attachmentMimeType: attachment?.mimeType || null,
        attachmentSize: attachment?.size || null,
        createdAt: serverTimestamp(),
      });

      Alert.alert("Success", "Đã lưu Employer lên Firebase!");
      navigation.navigate(StackScreens.home);
    } catch (error) {
      console.error("submitToFirebase error:", error);
      Alert.alert("Error", "Không thể lưu dữ liệu!");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title={t("employer")} showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Employer Setup</Text>
            </View>
            <Text style={styles.sectionTitle}>Company Profile</Text>
            <Text style={styles.helperText}>
              Save the company record once, then drivers can use the employer code to auto-fill their registration forms.
            </Text>
          </View>

          <View style={styles.formCard}>
            <FormInput
              placeholder={t("program")}
              value={program}
              onChangeText={setProgram}
            />
            <FormInput
              placeholder={t("date")}
              value={date}
              onChangeText={setDate}
            />
            <FormInput
              placeholder={t("code")}
              value={code}
              onChangeText={setCode}
              autoCapitalize="characters"
            />
            <FormInput
              placeholder={t("company_name")}
              value={companyName}
              onChangeText={setCompanyName}
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
              autoCapitalize="none"
              keyboardType="email-address"
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

            <Text style={styles.label}>{t("additional_note")}</Text>
            <FormInput
              style={styles.textArea}
              placeholder={t("additional_note")}
              multiline
              value={note}
              onChangeText={setNote}
            />

            <Text style={styles.label}>{t("file_upload_optional")}</Text>
            <UploadPickerField
              buttonText={t("file_upload_optional")}
              hint="Attach supporting letter, logo, image, or PDF"
              allowedTypes={["application/pdf", "image/*"]}
              file={attachment}
              onChange={setAttachment}
            />

            <ButtonForm onPress={submitToFirebase} text={t("next")} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EmployerLayout;
