import styles from "src/assets/styles/tabStyles/homeStyles/termStyles/term.styles";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import FormInput from "../../../../components/FormInput";
import HeaderTabs from "../../../../components/Header";
import ButtonForm from "../../../../components/ButtonForm";

import { StackScreens } from "@/configs/navigations/screens";
import { getEmployerByEmployerCode } from "@/v1/logics/services/employerService";

const TermLayout = (): React.JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [companyName, setCompanyName] = useState("");
  const [companyCode, setCompanyCode] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [usdot, setUsdot] = useState("");
  const [mcNumber, setMcNumber] = useState("");
  const [driverLicenseNumber, setDriverLicenseNumber] = useState("");
  const [driveIssueDate, setDriveIssueDate] = useState("");
  const [driverFirstName, setDriverFirstName] = useState("");
  const [driverLastName, setDriverLastName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [requestBy, setRequestBy] = useState("");
  const [terminationDate, setTerminationDate] = useState("");
  const [note, setNote] = useState("");
  const [typeQuestion, setTypeQuestion] = useState("");

  useEffect(() => {
    const normalizedCode = companyCode.trim();
    if (!normalizedCode) {
      return;
    }

    let active = true;
    const timeout = setTimeout(async () => {
      try {
        const employerData: any = await getEmployerByEmployerCode(normalizedCode);
        if (!active || !employerData) {
          return;
        }

        setCompanyName(employerData.companyName || "");
        setCompanyEmail(employerData.companyEmail || "");
        setUsdot(employerData.usdot || "");
        setMcNumber(employerData.mcNumber || "");
      } catch (error) {
        console.error("Term employer auto-fill error:", error);
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [companyCode]);

  const submitToHomeScreen = () => {
    if (!companyName.trim() || !driverFirstName.trim() || !driverLastName.trim()) {
      Alert.alert("Error", "Please complete the required termination details");
      return;
    }

    navigation.navigate(StackScreens.home);
  };

  const handleViewPdf = () => {
    Alert.alert("Coming soon", "PDF preview is not wired up yet on this screen.");
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Term" showBack />

      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="always">
        <View style={styles.form}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Termination Form</Text>
            </View>
            <Text style={styles.sectionTitle}>Driver Offboarding</Text>
            <Text style={styles.helperText}>
              Paste the company code to auto-fill employer details, then complete the driver termination request.
            </Text>
          </View>

          <View style={styles.formCard}>
            <FormInput placeholder={t('company_name')} value={companyName} onChangeText={setCompanyName} />
            <FormInput
              placeholder={t('company_code')}
              value={companyCode}
              onChangeText={setCompanyCode}
              autoCapitalize="characters"
            />
            <FormInput
              placeholder={t('company_email')}
              value={companyEmail}
              onChangeText={setCompanyEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <FormInput placeholder={t('usdot')} value={usdot} onChangeText={setUsdot} />
            <FormInput placeholder={t('mc_number')} value={mcNumber} onChangeText={setMcNumber} />
            <FormInput
              placeholder={t('driver_license_number')}
              value={driverLicenseNumber}
              onChangeText={setDriverLicenseNumber}
            />
            <FormInput placeholder={t('drive_issue_date')} value={driveIssueDate} onChangeText={setDriveIssueDate} />
            <FormInput placeholder={t('driver_first_name')} value={driverFirstName} onChangeText={setDriverFirstName} />
            <FormInput placeholder={t('driver_last_name')} value={driverLastName} onChangeText={setDriverLastName} />
            <FormInput
              placeholder={t('driver_phone')}
              value={driverPhone}
              onChangeText={setDriverPhone}
              keyboardType="phone-pad"
            />
            <FormInput placeholder={t('request_by')} value={requestBy} onChangeText={setRequestBy} />

            <Text style={styles.label}>{t('sign_here')}</Text>
            <View style={styles.signatureCard}>
              <Text style={styles.signatureText}>{t('sign_here')}</Text>
              <Text style={styles.signatureHint}>Signature capture area</Text>
            </View>

            <View style={styles.row}>
              <View style={styles.smallField}>
                <FormInput
                  placeholder={t('termination_date')}
                  value={terminationDate}
                  onChangeText={setTerminationDate}
                />
              </View>

              <View style={styles.smallField}>
                <FormInput placeholder={t('note')} value={note} onChangeText={setNote} />
              </View>
            </View>

            <FormInput placeholder={t('type_question')} value={typeQuestion} onChangeText={setTypeQuestion} />

            <TouchableOpacity style={styles.uploadBox}>
              <Text style={styles.uploadText}>{t('browse_file')}</Text>
              <Text style={styles.uploadHint}>Attach supporting document if needed</Text>
            </TouchableOpacity>

            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.secondaryButton} onPress={handleViewPdf}>
                <Text style={styles.secondaryButtonText}>{t('view_pdf')}</Text>
              </TouchableOpacity>

              <View style={styles.primaryButtonWrap}>
                <ButtonForm onPress={submitToHomeScreen} text={t('submit')} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermLayout;
