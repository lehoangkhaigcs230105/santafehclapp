import styles from "src/assets/styles/tabStyles/homeStyles/medicalCertificateStyles/medicalCertificateStepThree.styles";
import RadioButton from "src/v1/UI/components/RadioButton";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonForm from "../../../../components/ButtonForm";
import HeaderTabs from "../../../../components/Header";
import { StackScreens } from "@/configs/navigations/screens";

const radioOptions = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
  { value: "not-sure", label: "Not sure" },
];

const MedicalCertificateStepThreeLayout = () => {
  const [answers, setAnswers] = React.useState<{ surgery?: string; medication?: string }>({});
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <HeaderTabs title="Medical Certificate Step 3" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t("driver_health_history")}</Text>
        </View>

        <View style={styles.form}>
          <RadioButton
            label={t("had_surgery")}
            options={radioOptions}
            value={answers.surgery || ""}
            onChange={(value) => setAnswers((prev) => ({ ...prev, surgery: value }))}
            style={{ marginBottom: 10 }}
          />

          <TextInput style={styles.textArea} multiline placeholder={t("type_here")} placeholderTextColor="#666" />

          <RadioButton
            label={t("taking_medications")}
            options={radioOptions}
            value={answers.medication || ""}
            onChange={(value) => setAnswers((prev) => ({ ...prev, medication: value }))}
            style={{ marginBottom: 10 }}
          />

          <TextInput style={styles.textArea} multiline placeholder={t("type_here")} placeholderTextColor="#666" />

          <View style={styles.uploadBox}>
            <Text style={styles.uploadText}>PDF</Text>
          </View>

          <Text style={styles.question}>{t("hipaa_signature")}</Text>

          <View style={styles.uploadBox}>
            <Text style={styles.uploadText}>{t("sign_here")}</Text>
          </View>

          <Text style={styles.disclaimer}>{t("sensitive_document")}</Text>
        </View>

        <ButtonForm
          onPress={() => navigation.navigate(StackScreens.medicalCertificateQuestionListStepOne)}
          text={t("next")}
        />
      </ScrollView>
    </View>
  );
};

export default MedicalCertificateStepThreeLayout;
