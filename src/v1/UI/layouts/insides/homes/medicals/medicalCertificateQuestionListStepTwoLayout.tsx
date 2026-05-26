import styles from "src/assets/styles/tabStyles/homeStyles/medicalCertificateStyles/medicalCertificateQuestionListStepTwo.styles";
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

const MedicalCertificateQuestionListStepTwoLayout = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const handleSelect = (questionId: string | number, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Driver Health History 2" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.questionBlock}>
          <RadioButton label={t("diabetes")} options={radioOptions} value={answers[13] || ""} onChange={(value) => handleSelect(13, value)}>
            <RadioButton label={t("insulin_used")} options={radioOptions} value={answers.insulin || ""} onChange={(value) => handleSelect("insulin", value)} />
          </RadioButton>
          <RadioButton label={t("mental_health_problems")} options={radioOptions} value={answers[14] || ""} onChange={(value) => handleSelect(14, value)} />
          <RadioButton label={t("fainting")} options={radioOptions} value={answers[15] || ""} onChange={(value) => handleSelect(15, value)} />
          <RadioButton label={t("dizziness_headaches_numbness")} options={radioOptions} value={answers[16] || ""} onChange={(value) => handleSelect(16, value)} />
          <RadioButton label={t("unexplained_weight_loss")} options={radioOptions} value={answers[17] || ""} onChange={(value) => handleSelect(17, value)} />
          <RadioButton label={t("stroke_paralysis")} options={radioOptions} value={answers[18] || ""} onChange={(value) => handleSelect(18, value)} />
          <RadioButton label={t("limb_limitations")} options={radioOptions} value={answers[19] || ""} onChange={(value) => handleSelect(19, value)} />
          <RadioButton label={t("neck_back_problems")} options={radioOptions} value={answers[20] || ""} onChange={(value) => handleSelect(20, value)} />
          <RadioButton label={t("bone_muscle_joint_nerve")} options={radioOptions} value={answers[21] || ""} onChange={(value) => handleSelect(21, value)} />
          <RadioButton label={t("blood_clots_bleeding")} options={radioOptions} value={answers[22] || ""} onChange={(value) => handleSelect(22, value)} />
          <RadioButton label={t("cancer")} options={radioOptions} value={answers[23] || ""} onChange={(value) => handleSelect(23, value)} />
          <RadioButton label={t("chronic_infections")} options={radioOptions} value={answers[24] || ""} onChange={(value) => handleSelect(24, value)} />
        </View>

        <ButtonForm text={t("next")} onPress={() => navigation.navigate(StackScreens.medicalCertificateQuestionListStepThree)} />
      </ScrollView>
    </View>
  );
};

export default MedicalCertificateQuestionListStepTwoLayout;
