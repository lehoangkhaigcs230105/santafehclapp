import styles from "src/assets/styles/tabStyles/homeStyles/registerStyles/registerFinalStep.styles";
import React, { useState } from "react";
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
import { completeDriverRegister } from "@/v1/logics/services/driverRegister.service";

const RegisterFinalStepLayout = () => {
  const { t } = useTranslation();
  const navigation: any = useNavigation();

  const [witness, setWitness] = useState("");
  const [signDate, setSignDate] = useState("");
  const [clinicSignatureOptional, setClinicSignatureOptional] = useState("");

  const pushToHomeScreen = async () => {
    if (!witness.trim() || !signDate.trim()) {
      Alert.alert("Error", "Please complete witness and sign date");
      return;
    }

    try {
      await completeDriverRegister({
        witness,
        signDate,
        clinicSignatureOptional,
        completed: true,
      });

      navigation.navigate(StackScreens.home);
    } catch (error) {
      console.error("Final step error:", error);
      Alert.alert("Error", "Cannot submit register");
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Register Final Step" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 3 of 3</Text>
            </View>
            <Text style={styles.sectionTitle}>Review and Sign</Text>
            <Text style={styles.helperText}>
              Upload any final signatures or supporting files, then complete the registration.
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>{t("initial_read_sections")}</Text>

            <TouchableOpacity style={styles.uploadBox}>
              <Text style={styles.uploadText}>{t("upload_photo")}</Text>
              <Text style={styles.uploadHint}>Upload initials or acknowledgement</Text>
            </TouchableOpacity>

            <Text style={styles.label}>{t("member_signature")}</Text>

            <TouchableOpacity style={styles.uploadBox}>
              <Text style={styles.uploadText}>{t("upload_photo")}</Text>
              <Text style={styles.uploadHint}>Member signature image</Text>
            </TouchableOpacity>

            <FormInput
              placeholder={t("witness")}
              value={witness}
              onChangeText={setWitness}
            />
            <FormInput
              placeholder={t("sign_date")}
              value={signDate}
              onChangeText={setSignDate}
            />
            <FormInput
              placeholder={t("clinic_signature_optional")}
              value={clinicSignatureOptional}
              onChangeText={setClinicSignatureOptional}
            />

            <TouchableOpacity style={styles.uploadBox}>
              <Text style={styles.uploadText}>{t("upload_photo")}</Text>
              <Text style={styles.uploadHint}>Clinic signature if available</Text>
            </TouchableOpacity>

            <ButtonForm onPress={pushToHomeScreen} text={t("submit")} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterFinalStepLayout;
