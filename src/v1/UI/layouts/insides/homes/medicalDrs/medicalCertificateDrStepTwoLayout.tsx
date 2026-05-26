import styles from "src/assets/styles/tabStyles/homeStyles/medicalCertificateDrStyles/medicalCertificateDrStepTwo.styles";
import ButtonForm from "src/v1/UI/components/ButtonForm";
import HeaderTabs from "src/v1/UI/components/Header";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StackScreens } from "@/configs/navigations/screens";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const MedicalCertificateDrStepTwoLayout = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  
  const [radioSelection, setRadioSelection] = useState<string | null>(null);
  const [clpSelection, setClpSelection] = useState<"yes" | "no" | null>(null);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(8).fill(false));

  const toggleCheckbox = (index: number) => {
    setCheckedItems((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  const pushToMedicalCertificateDrStepThree = () => {
    navigation.navigate(StackScreens.medicalCertificateDrStepThree);
    console.log("Navigate to Medical Dr Screen 3");
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Medical Examiner Step 2" showBack />
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{t('medical_examiner_certificate')}</Text>
        </View>

        <View style={styles.form}>
          {/* Radio Section */}
          <TouchableOpacity
            style={[styles.radioRow, { justifyContent: "space-between" }]}
            onPress={() => setRadioSelection("option1")}
          >
            <Text style={styles.label}>
               {t('federal_motor_carrier_safety_regulations_duty')}
            </Text>
            <Text style={styles.radioIcon}>
              {radioSelection === "option1" ? "🔘" : "⚪"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.radioRow, { justifyContent: "space-between" }]}
            onPress={() => setRadioSelection("option2")}
          >
            <Text style={styles.label}>
              {t('federal_motor_carrier_safety_regulations')}
            </Text>
            <Text style={styles.radioIcon}>
              {radioSelection === "option2" ? "🔘" : "⚪"}
            </Text>
          </TouchableOpacity>

        <View style={styles.lineUnder} />
          <Text style={styles.label}>
            {t('i_find_person_qualified')}
          </Text>

          {/* Checklist */}
        <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox(0)}>
          <Text style={styles.checkboxLabel}> {t('wearing_corrective_lenses')}</Text>
          <Text style={styles.checkboxBox}>{checkedItems[0] ? "☑️" : "⬜"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox(1)}>
          <Text style={styles.checkboxLabel}>{t('accompanied_by')}</Text>
          <Text style={styles.checkboxBox}>{checkedItems[1] ? "☑️" : "⬜"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox(2)}>
          <Text style={styles.checkboxLabel}>{t('driving_exempt_intracity_zone')}</Text>
          <Text style={styles.checkboxBox}>{checkedItems[2] ? "☑️" : "⬜"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox(3)}>
          <Text style={styles.checkboxLabel}>{t('wearing_hearing_aid')}</Text>
          <Text style={styles.checkboxBox}>{checkedItems[3] ? "☑️" : "⬜"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox(4)}>
          <Text style={styles.checkboxLabel}>{t('skill_performance_evaluation_certificate')}</Text>
          <Text style={styles.checkboxBox}>{checkedItems[4] ? "☑️" : "⬜"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox(5)}>
          <Text style={styles.checkboxLabel}> {t('qualified_by_49_cfr_391_64')} </Text>
          <Text style={styles.checkboxBox}>{checkedItems[5] ? "☑️" : "⬜"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox(6)}>
          <Text style={styles.checkboxLabel}> {t('grandfathered_state_requirements')}</Text>
          <Text style={styles.checkboxBox}>{checkedItems[6] ? "☑️" : "⬜"}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleCheckbox(7)}>
          <Text style={styles.checkboxLabel}>{t('waiver_exemption')}</Text>
          <Text style={styles.checkboxBox}>{checkedItems[7] ? "☑️" : "⬜"}</Text>
        </TouchableOpacity>

        <View style={styles.lineUnder} />

            {/* Info Section */}
            <Text style={styles.infoText}>
              {t('exam_info_true_complete')}
            </Text>
            <Text style={styles.infoText}>
              {t('mcsa_5875_findings')}
            </Text>
            <Text style={styles.infoText}>{t('clp_cdl_applicant_holder')}</Text>

            {/* CLP/CDL Yes/No */}
            <View style={[styles.radioRow, { marginBottom: 12 }]}>
              <TouchableOpacity
                onPress={() => setClpSelection("yes")}
                style={[
                  styles.radioButton,
                  clpSelection === "yes" && styles.radioButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    clpSelection === "yes" && styles.optionTextActive,
                  ]}
                >
                  ○ Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setClpSelection("no")}
                style={[
                  styles.radioButton,
                  clpSelection === "no" && styles.radioButtonActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    clpSelection === "no" && styles.optionTextActive,
                  ]}
                >
                  ○ No
                </Text>
              </TouchableOpacity>
            </View>

          {/* Warning */}
          <Text style={[styles.label, { fontWeight: "bold", color: "red", marginTop: 24 }]}>
             {t('document_sensitive_official_use_only')}
          </Text>

          {/* NEXT */}
          <ButtonForm text={t('next')} onPress={pushToMedicalCertificateDrStepThree} />
        </View>
      </ScrollView>
    </View>
  );
}

export default MedicalCertificateDrStepTwoLayout;