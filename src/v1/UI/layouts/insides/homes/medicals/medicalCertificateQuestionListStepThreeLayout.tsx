import styles from "src/assets/styles/tabStyles/homeStyles/medicalCertificateStyles/medicalCertificateQuestionListStepThree.styles";
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

const MedicalCertificateQuestionListStepThreeLayout = () => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const handleSelect = (id: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="DRIVER HEALTH HISTORY 3" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.questionBlock}>
          <RadioButton label={t("sleep_disorders")} options={radioOptions} value={answers[25] || ""} onChange={(value) => handleSelect(25, value)} />
          <RadioButton label={t("sleep_test_history")} options={radioOptions} value={answers[26] || ""} onChange={(value) => handleSelect(26, value)} />
          <RadioButton label={t("hospitalized_history")} options={radioOptions} value={answers[27] || ""} onChange={(value) => handleSelect(27, value)} />
          <RadioButton label={t("broken_bone_history")} options={radioOptions} value={answers[28] || ""} onChange={(value) => handleSelect(28, value)} />
          <RadioButton label={t("tobacco_use")} options={radioOptions} value={answers[29] || ""} onChange={(value) => handleSelect(29, value)} />
          <RadioButton label={t("alcohol_use")} options={radioOptions} value={answers[30] || ""} onChange={(value) => handleSelect(30, value)} />
          <RadioButton label={t("illegal_substance_use_recent")} options={radioOptions} value={answers[31] || ""} onChange={(value) => handleSelect(31, value)} />
          <RadioButton label={t("failed_drug_test_or_dependency")} options={radioOptions} value={answers[32] || ""} onChange={(value) => handleSelect(32, value)} />
        </View>

        <ButtonForm text={t("next")} onPress={() => navigation.navigate(StackScreens.medicalCertificateStepFour)} />
      </ScrollView>
    </View>
  );
};

export default MedicalCertificateQuestionListStepThreeLayout;
