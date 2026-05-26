import styles from "src/assets/styles/tabStyles/homeStyles/medicalCertificateStyles/medicalCertificateQuestionListStepOne.styles";
import ButtonForm from "src/v1/UI/components/ButtonForm";
import HeaderTabs from "src/v1/UI/components/Header";
import RadioButton from "src/v1/UI/components/RadioButton";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackScreens } from "@/configs/navigations/screens";

const radioOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Not sure", value: "not-sure" },
];

const MedicalCertificateQuestionListStepOneLayout = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const handleSelect = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Driver Health History 1" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.questionBlock}>
          <RadioButton label={t("head_brain_injuries")} options={radioOptions} value={answers[1] || ""} onChange={(value) => handleSelect(1, value)} />
          <RadioButton label={t("seizures_epilepsy")} options={radioOptions} value={answers[2] || ""} onChange={(value) => handleSelect(2, value)} />
          <RadioButton label={t("eye_problems")} options={radioOptions} value={answers[3] || ""} onChange={(value) => handleSelect(3, value)} />
          <RadioButton label={t("ear_hearing_problems")} options={radioOptions} value={answers[4] || ""} onChange={(value) => handleSelect(4, value)} />
          <RadioButton label={t("heart_disease")} options={radioOptions} value={answers[5] || ""} onChange={(value) => handleSelect(5, value)} />
          <RadioButton label={t("heart_devices")} options={radioOptions} value={answers[6] || ""} onChange={(value) => handleSelect(6, value)} />
          <RadioButton label={t("high_blood_pressure")} options={radioOptions} value={answers[7] || ""} onChange={(value) => handleSelect(7, value)} />
          <RadioButton label={t("high_cholesterol")} options={radioOptions} value={answers[8] || ""} onChange={(value) => handleSelect(8, value)} />
          <RadioButton label={t("chronic_cough_breathing")} options={radioOptions} value={answers[9] || ""} onChange={(value) => handleSelect(9, value)} />
          <RadioButton label={t("lung_disease")} options={radioOptions} value={answers[10] || ""} onChange={(value) => handleSelect(10, value)} />
          <RadioButton label={t("kidney_problems")} options={radioOptions} value={answers[11] || ""} onChange={(value) => handleSelect(11, value)} />
          <RadioButton label={t("digestive_problems")} options={radioOptions} value={answers[12] || ""} onChange={(value) => handleSelect(12, value)} />
        </View>

        <ButtonForm text={t("next")} onPress={() => navigation.navigate(StackScreens.medicalCertificateQuestionListStepTwo)} />
      </ScrollView>
    </View>
  );
};

export default MedicalCertificateQuestionListStepOneLayout;
