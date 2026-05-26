import styles from "src/assets/styles/tabStyles/homeStyles/hairTestStyles/hairTestFinalStep.styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonForm from "../../../../components/ButtonForm";
import FormInput from "../../../../components/FormInput";
import HeaderTabs from "../../../../components/Header";
import { StackScreens } from "@/configs/navigations/screens";

const HairTestFinalStepLayout = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [witness, setWitness] = useState("");
  const [signDate, setSignDate] = useState("");
  const [clinicSignatureOptional, setClinicSignatureOptional] = useState("");

  const pushToHomeScreen = () => {
    if (!witness.trim() || !signDate.trim()) {
      Alert.alert("Error", "Please complete witness and sign date");
      return;
    }

    navigation.navigate(StackScreens.home);
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Hair Test Final Step" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <Text style={styles.label}>{t("initial_read_sections")}</Text>
          <TouchableOpacity style={styles.uploadBox}>
            <Text style={styles.uploadText}>{t("upload_photo")}</Text>
          </TouchableOpacity>

          <Text style={styles.label}>{t("member_signature")}</Text>
          <TouchableOpacity style={styles.uploadBox}>
            <Text style={styles.uploadText}>{t("upload_photo")}</Text>
          </TouchableOpacity>

          <FormInput placeholder={t("witness")} value={witness} onChangeText={setWitness} />
          <FormInput placeholder={t("sign_date")} value={signDate} onChangeText={setSignDate} />
          <FormInput placeholder={t("clinic_signature_optional")} value={clinicSignatureOptional} onChangeText={setClinicSignatureOptional} />

          <TouchableOpacity style={styles.uploadBox}>
            <Text style={styles.uploadText}>{t("upload_photo")}</Text>
          </TouchableOpacity>

          <ButtonForm onPress={pushToHomeScreen} text={t("submit")} />
        </View>
      </ScrollView>
    </View>
  );
};

export default HairTestFinalStepLayout;
