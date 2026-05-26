import styles from "src/assets/styles/tabStyles/homeStyles/medicalCertificateStyles/medicalCertificateStepOne.styles";
import { TextColors } from "src/configs/constants/color";
import ButtonForm from "src/v1/UI/components/ButtonForm";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, View } from "react-native";
import FormInput from "../../../../components/FormInput";
import HeaderTabs from "../../../../components/Header";
import { useNavigation } from "@react-navigation/native";
import { StackScreens } from "@/configs/navigations/screens";
import { getDriverPrefillData } from "@/v1/logics/services/prefillService";

const MedicalCertificateStepOneLayout = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [medicalRecord, setMedicalRecord] = useState("DOT");
  const [license, setLicense] = useState("");
  const [driverFirstName, setDriverFirstName] = useState("");
  const [driverLastName, setDriverLastName] = useState("");
  const [examDate, setExamDate] = useState("");
  const [driverIdVerifiedBy, setDriverIdVerifiedBy] = useState("");

  useEffect(() => {
    const loadPrefill = async () => {
      try {
        const prefill = await getDriverPrefillData();
        if (!prefill) return;
        setLicense((current) => current || prefill.license || prefill.driverLicenseNumber);
        setDriverFirstName((current) => current || prefill.driverFirstName);
        setDriverLastName((current) => current || prefill.driverLastName);
      } catch (error) {
        console.error("Medical certificate step 1 prefill error:", error);
      }
    };

    loadPrefill();
  }, []);

  const pushToMedicalCertificateStepTwo = () => {
    if (!license.trim() || !driverFirstName.trim() || !driverLastName.trim()) {
      Alert.alert("Error", "Please complete the basic driver details");
      return;
    }

    navigation.navigate(StackScreens.medicalCertificateStepTwo, {
      medicalRecord,
      license: license.trim(),
      driverFirstName: driverFirstName.trim(),
      driverLastName: driverLastName.trim(),
      examDate: examDate.trim(),
      driverIdVerifiedBy: driverIdVerifiedBy.trim(),
    });
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Medical Certificate Step 1" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{t("medical_form")}</Text>
        </View>

        <View style={styles.formBox}>
          <View style={styles.form}>
            <FormInput
              placeholder={t("license")}
              value={license}
              onChangeText={setLicense}
              iconRight={<Ionicons name="person-outline" size={20} color="#888" />}
            />

            <FormInput
              placeholder={t("driver_first_name")}
              value={driverFirstName}
              onChangeText={setDriverFirstName}
            />
            <FormInput
              placeholder={t("driver_last_name")}
              value={driverLastName}
              onChangeText={setDriverLastName}
            />
          </View>

          <View style={styles.fieldRow}>
            <Text style={styles.fieldLabel}>{t("medical_record")}</Text>

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={medicalRecord}
                onValueChange={setMedicalRecord}
                style={styles.picker}
                dropdownIconColor={TextColors.gray}
              >
                <Picker.Item label="DOT" value="DOT" />
                <Picker.Item label="Non-DOT" value="Non-DOT" />
              </Picker>
            </View>
          </View>

          <View style={styles.form}>
            <FormInput placeholder={t("exam_date")} value={examDate} onChangeText={setExamDate} />
            <FormInput
              placeholder={t("driver_id_verified_by")}
              value={driverIdVerifiedBy}
              onChangeText={setDriverIdVerifiedBy}
            />
          </View>

          <ButtonForm onPress={pushToMedicalCertificateStepTwo} text={t("next")} />
        </View>
      </ScrollView>
    </View>
  );
};

export default MedicalCertificateStepOneLayout;
