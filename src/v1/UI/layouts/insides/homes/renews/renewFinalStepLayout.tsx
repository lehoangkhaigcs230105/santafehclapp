import styles from "src/assets/styles/tabStyles/homeStyles/renewStyles/renewFinalStep.styles";
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
import UploadPickerField, {
  SelectedUploadFile,
} from "../../../../components/UploadPickerField";

import { StackScreens } from "@/configs/navigations/screens";

const RenewFinalStepLayout = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [witness, setWitness] = useState("");
  const [signDate, setSignDate] = useState("");
  const [clinicSignatureOptional, setClinicSignatureOptional] = useState("");
  const [initialsFile, setInitialsFile] = useState<SelectedUploadFile | null>(null);
  const [memberSignatureFile, setMemberSignatureFile] = useState<SelectedUploadFile | null>(null);
  const [clinicSignatureFile, setClinicSignatureFile] = useState<SelectedUploadFile | null>(null);

  const pushToHomeScreen = () => {
    if (!witness.trim() || !signDate.trim()) {
      Alert.alert("Error", "Please complete witness and sign date");
      return;
    }

    navigation.navigate(StackScreens.home as never);
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Renew Final Step" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 4 of 4</Text>
            </View>
            <Text style={styles.sectionTitle}>Sign and Submit</Text>
            <Text style={styles.helperText}>
              Finish the renewal packet with signatures and any optional supporting files.
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>{t('initial_read_sections')}</Text>
            <UploadPickerField
              buttonText={t("upload_photo")}
              hint="Add initials or acknowledgement"
              allowedTypes={["application/pdf", "image/*"]}
              file={initialsFile}
              onChange={setInitialsFile}
            />

            <Text style={styles.label}>{t('member_signature')}</Text>
            <UploadPickerField
              buttonText={t("upload_photo")}
              hint="Upload the member signature"
              allowedTypes={["application/pdf", "image/*"]}
              file={memberSignatureFile}
              onChange={setMemberSignatureFile}
            />

            <FormInput placeholder={t('witness')} value={witness} onChangeText={setWitness} />
            <FormInput placeholder={t('sign_date')} value={signDate} onChangeText={setSignDate} />
            <FormInput
              placeholder={t('clinic_signature_optional')}
              value={clinicSignatureOptional}
              onChangeText={setClinicSignatureOptional}
            />

            <UploadPickerField
              buttonText={t("upload_photo")}
              hint="Clinic signature if needed"
              allowedTypes={["application/pdf", "image/*"]}
              file={clinicSignatureFile}
              onChange={setClinicSignatureFile}
            />

            <ButtonForm onPress={pushToHomeScreen} text={t('submit')} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RenewFinalStepLayout;
