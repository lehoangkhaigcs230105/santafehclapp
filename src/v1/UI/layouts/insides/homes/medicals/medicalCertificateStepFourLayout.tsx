import { styles } from "src/assets/styles/tabStyles/homeStyles/medicalCertificateStyles/medicalCertificateStepFour.styles";
import RadioButton from "src/v1/UI/components/RadioButton";
import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonForm from "../../../../components/ButtonForm";
import HeaderTabs from "../../../../components/Header";
import { StackScreens } from "@/configs/navigations/screens";

const radioOptions = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Not sure", value: "not-sure" },
];

const MedicalCertificateStepFourLayout = () => {
  const [answers, setAnswers] = React.useState<{ [key: string]: string }>({});
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <HeaderTabs title="Medical Certificate Step 4" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{t("driver_health_history")}</Text>
        </View>

        <View style={styles.section}>
          <RadioButton
            label={t("other_health_conditions")}
            options={radioOptions}
            value={answers.otherHealth || ""}
            onChange={(value) => setAnswers((prev) => ({ ...prev, otherHealth: value }))}
          />

          <Text style={styles.textareaLabel}>{t("please_describe_below")}</Text>
          <View style={styles.textareaPlaceholder}>
            <Text style={styles.textareaText}>{t("type_here")}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <RadioButton
            label={t("yes_answer_questions_1_32_comment")}
            options={radioOptions}
            value={answers.commentHealth || ""}
            onChange={(value) => setAnswers((prev) => ({ ...prev, commentHealth: value }))}
          />

          <Text style={styles.textareaLabel}>{t("if_yes_list_explain_below")}</Text>
          <View style={styles.textareaPlaceholder}>
            <Text style={styles.textareaText}>{t("type_here")}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.question}>{t("driver_signature")}</Text>
          <View style={styles.textareaPlaceholder}>
            <Text style={styles.textareaText}>{t("sign_here")}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.question}>{t("driver_signature_date")}</Text>
          <View style={styles.separator} />
        </View>

        <View style={styles.section}>
          <Text style={styles.question}>{t("driver_health_history_review")}</Text>
          <View style={styles.textareaPlaceholder}>
            <Text style={styles.textareaText}>{t("type_here")}</Text>
          </View>
        </View>

        <ButtonForm onPress={() => navigation.navigate(StackScreens.home)} text={t("submit")} />
      </ScrollView>
    </View>
  );
};

export default MedicalCertificateStepFourLayout;
