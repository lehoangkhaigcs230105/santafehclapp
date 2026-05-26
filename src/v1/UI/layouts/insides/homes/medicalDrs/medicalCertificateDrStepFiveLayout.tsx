import styles from "src/assets/styles/tabStyles/homeStyles/medicalCertificateDrStyles/medicalCertificateDrStepFive.styles";
import ButtonForm from "src/v1/UI/components/ButtonForm";
import FormInput from "src/v1/UI/components/FormInput";
import HeaderTabs from "src/v1/UI/components/Header";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StackScreens } from "@/configs/navigations/screens";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const MedicalCertificateDrStepFiveLayout = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const [selectedStandard, setSelectedStandard] = useState<string>("meets-standards");
  const [qualificationPeriod, setQualificationPeriod] = useState<string | null>(null);
  const [dmvSelections, setDmvSelections] = useState<string[]>([]);

  const toggleDmv = (label: string) => {
    setDmvSelections((prev) =>
      prev.includes(label)
        ? prev.filter((v) => v !== label)
        : [...prev, label]
    );
  };

  const pushToHomeScreen = () => {
    navigation.navigate(StackScreens.home);
    console.log("Navigate to HomeScreen");
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Medical Examiner Step 5" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>

        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{t('medical_examiner_certificate')}</Text>
        </View>

        <Text style={styles.label}>
           {t('use_this_section_for_examinations')}
        </Text>

        {/* Radio Section for Standards */}
        <TouchableOpacity style={styles.radioRow} onPress={() => setSelectedStandard("meets-standards")}>
          <Text style={styles.label}>
            {selectedStandard === "meets-standards" ? "🔘" : "⚪"}  {t('meets_standards_2_year_certificate')}
          </Text>
        </TouchableOpacity>

          <TouchableOpacity style={styles.radioRow} onPress={() => setSelectedStandard("remove")}>
            <Text style={styles.label}>
              {selectedStandard === "remove" ? "🔘" : "⚪"} REMOVE 
            </Text>
          </TouchableOpacity>

        <TouchableOpacity style={styles.radioRow} onPress={() => setSelectedStandard("not-meet-1")}>
          <Text style={styles.label}>
            {selectedStandard === "not-meet-1" ? "🔘" : "⚪"}  {t('does_not_meet_standards')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.radioRow} onPress={() => setSelectedStandard("not-meet-2")}>
          <Text style={styles.label}>
            {selectedStandard === "not-meet-2" ? "🔘" : "⚪"} {t('does_not_meet_standards')}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.radioRow} onPress={() => setSelectedStandard("not-meet-3")}>
          <Text style={styles.label}>
            {selectedStandard === "not-meet-3" ? "🔘" : "⚪"}  {t('does_not_meet_standards')}
          </Text>
        </TouchableOpacity>

        {/* Text input for non-standard reasons */}
        {["not-meet-1", "not-meet-2", "not-meet-3"].includes(selectedStandard) && (
          <FormInput placeholder={t('type_reason_here')} style={styles.input} />
        )}

        {/* Qualification Period */}
        <Text style={styles.label}>{t('driver_qualified_for')}</Text>

      <View style={styles.radioGrid}>
        <View style={styles.radioCol}>
          <TouchableOpacity style={styles.radioRow} onPress={() => setQualificationPeriod("3 months")}>
            <Text style={styles.label}>
              {qualificationPeriod === "3 months" ? "🔘" : "⚪"}  {t('three_months')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.radioRow} onPress={() => setQualificationPeriod("6 months")}>
            <Text style={styles.label}>
              {qualificationPeriod === "6 months" ? "🔘" : "⚪"} {t('six_months')}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.radioCol}>
          <TouchableOpacity style={styles.radioRow} onPress={() => setQualificationPeriod("1 year")}>
            <Text style={styles.label}>
              {qualificationPeriod === "1 year" ? "🔘" : "⚪"}  {t('one_year')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.radioRow} onPress={() => setQualificationPeriod("Other (specify)")}>
            <Text style={styles.label}>
              {qualificationPeriod === "Other (specify)" ? "🔘" : "⚪"} {t('other_specify')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

        {/* Dates */}
        <FormInput placeholder= {t('certificate_signed_date')} />

        <FormInput placeholder= {t('certificate_expiration_date')} />

        {/* DMV checkboxes */}
        <Text style={styles.label}>{t('dmv')}</Text>
        <View style={styles.checkboxGrid}>
        <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleDmv("CA")}>
          <Text style={styles.label}>
            {dmvSelections.includes("CA") ? "☑" : "⬜"} CA 
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleDmv("Out Of State")}>
          <Text style={styles.label}>
            {dmvSelections.includes("Out Of State") ? "☑" : "⬜"}  {t('out_of_state')}
          </Text>
        </TouchableOpacity>
        </View>

        <ButtonForm text={t('next')} onPress={pushToHomeScreen} />
      </ScrollView>
    </View>
  );
}

export default MedicalCertificateDrStepFiveLayout;