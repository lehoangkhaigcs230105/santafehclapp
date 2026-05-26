import styles from "src/assets/styles/tabStyles/homeStyles/medicalCertificateDrStyles/medicalCertificateDrStepFour.styles";
import ButtonForm from "src/v1/UI/components/ButtonForm";
import HeaderTabs from "src/v1/UI/components/Header";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StackScreens } from "@/configs/navigations/screens";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

const MedicalCertificateDrStepFourLayout = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const toggleCheckbox = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInputChange = (id: string, value: string) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const pushToMedicalCertificateDrStepFive = () => {
    navigation.navigate(StackScreens.medicalCertificateDrStepFive);
    console.log("Navigate to Medical Dr Screen 5");
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Medical Examiner Step 4" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{t('medical_examiner_certificate')}</Text>
        </View>

        <View style={styles.form}>

            <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox("physician-assistant")}>
                        <Text style={styles.checkboxBox}>{checkedItems.includes("physician-assistant") ? "☑️" : "⬜"}</Text>
                        <Text style={styles.checkboxLabel}> {t('determination_pending')}</Text>
            </TouchableOpacity>
            
          {/* Return to medical exam office for follow-up */}
          <Text style={styles.sectionLabel}>{t('driver_qualified_for')}</Text>
         
            <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox("return-followup")}>
                        <Text style={styles.checkboxBox}>{checkedItems.includes("return-followup") ? "☑️" : "⬜"}</Text>
                        <Text style={styles.checkboxLabel}> {t('return_for_follow_up')}</Text>
            </TouchableOpacity>
          
        {checkedItems.includes("return-followup") && (
          <TextInput
            placeholder={t('type_here')}
            style={styles.input}
            value={inputs["return-followup"] || ""}
            onChangeText={(text) => handleInputChange("return-followup", text)}
          />
        )}

          {/* Medical Examination Report amended */}
          <Text style={styles.sectionLabel}>{t('driver_qualified_for')}</Text>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox("report-amended")}>
                        <Text style={styles.checkboxBox}>{checkedItems.includes("report-amended") ? "☑️" : "⬜"}</Text>
                        <Text style={styles.checkboxLabel}>{t('medical_examination_report_amended')}</Text>
            </TouchableOpacity>

            {checkedItems.includes("report-amended") && (
              <>

                <TextInput
                  placeholder={t('type_here')}
                  style={styles.input}
                  value={inputs["report-amended"] || ""}
                  onChangeText={(text) => handleInputChange("report-amended", text)}
                />

                <Text style={styles.sectionLabel}> {t('date_if_amended')}</Text>
                <TextInput
                  placeholder= {t('mm_dd_yyyy')}
                  style={styles.input}
                  value={inputs["amended-date"] || ""}
                  onChangeText={(text) => handleInputChange("amended-------date", text)}
                />

                <Text style={styles.sectionLabel}> {t('signature_if_amended')}</Text>
                  <View style={styles.signatureBox}>
                    <Text style={styles.signaturePlaceholder}>{t('sign_here')}</Text>
                  </View>
               </>
            )}

         {/* Incomplete examination */}
            <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox("incomplete-exam")}>
                        <Text style={styles.checkboxBox}>{checkedItems.includes("incomplete-exam") ? "☑️" : "⬜"}</Text>
                        <Text style={styles.checkboxLabel}> {t('incomplete_examination_reason')}</Text>
            </TouchableOpacity>
          
        {checkedItems.includes("incomplete-exam") && (
          <TextInput
            placeholder={t('type_here')}
            style={styles.input}
            value={inputs["incomplete-exam"] || ""}
            onChangeText={(text) => handleInputChange("incomplete-exam", text)}
          />
        )}

          {/* Wearing hearing aid */}
          <Text style={styles.sectionLabel}>{t('driver_qualified_for')}</Text>
          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox("wearing-hearing-aid")}>
                        <Text style={styles.checkboxBox}>{checkedItems.includes("wearing-hearing-aid") ? "☑️" : "⬜"}</Text>
                        <Text style={styles.checkboxLabel}> {t('wearing_hearing_aid')}</Text>
            </TouchableOpacity>

          {/* Accompanied by a waiver/exemption */}
          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox("waiver")}>
                        <Text style={styles.checkboxBox}>{checkedItems.includes("waiver") ? "☑️" : "⬜"}</Text>
                        <Text style={styles.checkboxLabel}> {t('waiver_exemption_specify')}</Text>
          </TouchableOpacity>
            {checkedItems.includes("waiver") && (
              <TextInput
                placeholder={t('type_here')}
                style={styles.input}
                value={inputs["waiver"] || ""}
                onChangeText={(text) => handleInputChange("waiver", text)}
              />
            )}
         
          {/* Accompanied by a Skill Performance Evaluation (SPE) Certificate */}
          <Text style={styles.sectionLabel}>{t('driver_qualified_for')}</Text>
          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox("spe-certificate")}>
                        <Text style={styles.checkboxBox}>{checkedItems.includes("spe-certificate") ? "☑️" : "⬜"}</Text>
                        <Text style={styles.checkboxLabel}>{t('skill_performance_evaluation_certificate')}</Text>
          </TouchableOpacity>

          {/* Qualified by operation of 49 CFR 391.64 (Federal) */}
          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox("qualified-operation")}>
                        <Text style={styles.checkboxBox}>{checkedItems.includes("qualified-operation") ? "☑️" : "⬜"}</Text>
                        <Text style={styles.checkboxLabel}>{t('qualified_by_49_cfr_391_64')}</Text>
          </TouchableOpacity>

          
          {/* Driving within an exempt intracity zone */}
          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox("driving-exempt")}>
                        <Text style={styles.checkboxBox}>{checkedItems.includes("driving-exempt") ? "☑️" : "⬜"}</Text>
                        <Text style={styles.checkboxLabel}> {t('driving_exempt_intracity_zone')}</Text>
          </TouchableOpacity>

          {/* Signature input field */}
          <Text style={styles.sectionLabel}>{t('signature_if_amended')} </Text>
          <View style={styles.signatureBox}>
            <Text style={styles.signaturePlaceholder}> {t('sign_here')}</Text>
          </View>

          {/* NEXT Button */}
          <ButtonForm text={t('next')} onPress={pushToMedicalCertificateDrStepFive} />
        </View>
      </ScrollView>
    </View>
  );
}

export default MedicalCertificateDrStepFourLayout;