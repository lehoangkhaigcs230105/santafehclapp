import styles from "src/assets/styles/tabStyles/homeStyles/postAccidentStyles/postAccidentStepTwo.styles";
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
import { getEmployerByEmployerCode } from "@/v1/logics/services/employerService";

const PostAccidentStepTwoLayout = () => {
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

  useEffect(() => {
    const normalizedCode = code.trim();
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
        console.error("Employer auto-fill error:", error);
      }
    }, 250);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [code]);

  const pushToNext = () => {
    if (!code.trim() || !companyName.trim()) {
      Alert.alert("Error", "Please complete the company information");
      return;
    }

    navigation.navigate(StackScreens.postAccidentStepThree);
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Post Accident Step 2" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 2 of 4</Text>
            </View>
            <Text style={styles.sectionTitle}>Employer Details</Text>
            <Text style={styles.helperText}>
              Paste the company code to auto-fill employer information, then review anything that needs to change.
            </Text>
          </View>

          <View style={styles.formCard}>
            <FormInput
              placeholder={t('code')}
              value={code}
              onChangeText={setCode}
              autoCapitalize="characters"
            />
            <FormInput placeholder={t('company_name')} value={companyName} onChangeText={setCompanyName} />
            <FormInput
              placeholder={t('driver_phone')}
              value={driverPhone}
              onChangeText={setDriverPhone}
              keyboardType="phone-pad"
            />
            <FormInput placeholder={t('company_city')} value={companyCity} onChangeText={setCompanyCity} />
            <FormInput placeholder={t('company_address')} value={companyAddress} onChangeText={setCompanyAddress} />
            <FormInput
              placeholder={t('company_email')}
              value={companyEmail}
              onChangeText={setCompanyEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.row}>
              <View style={styles.smallField}>
                <FormInput placeholder={t('company_state')} value={companyState} onChangeText={setCompanyState} />
              </View>
              <View style={styles.smallField}>
                <FormInput
                  placeholder={t('company_zip')}
                  value={companyZip}
                  onChangeText={setCompanyZip}
                  keyboardType="number-pad"
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.smallField}>
                <FormInput placeholder={t('usdot')} value={usdot} onChangeText={setUsdot} />
              </View>
              <View style={styles.smallField}>
                <FormInput placeholder={t('mc_number')} value={mcNumber} onChangeText={setMcNumber} />
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.smallField}>
                <FormInput placeholder={t('der_first_name')} value={derFirstName} onChangeText={setDerFirstName} />
              </View>
              <View style={styles.smallField}>
                <FormInput placeholder={t('der_last_name')} value={derLastName} onChangeText={setDerLastName} />
              </View>
            </View>

            <FormInput
              placeholder={t('date_of_enrollment')}
              value={dateOfEnrollment}
              onChangeText={setDateOfEnrollment}
            />
            <FormInput
              placeholder={t('date_of_expiration')}
              value={dateOfExpiration}
              onChangeText={setDateOfExpiration}
            />

            <Text style={styles.label}>{t('file_upload_optional')}</Text>
            <TouchableOpacity style={styles.uploadBox}>
              <Text style={styles.uploadText}>{t('upload_photo')}</Text>
              <Text style={styles.uploadHint}>Add supporting file if needed</Text>
            </TouchableOpacity>

            <ButtonForm onPress={pushToNext} text={t('next')} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PostAccidentStepTwoLayout;
