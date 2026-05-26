import styles from "src/assets/styles/tabStyles/homeStyles/medicalCertificateDrStyles/medicalCertificateDrStepThree.styles";
import ButtonForm from "src/v1/UI/components/ButtonForm";
import FormInput from "src/v1/UI/components/FormInput";
import HeaderTabs from "src/v1/UI/components/Header";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StackScreens } from "@/configs/navigations/screens";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

const MedicalCertificateDrStepThreeLayout = () => {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  
  const [selectedDoctors, setSelectedDoctors] = useState<string[]>([]);
  const [inputs, setInputs] = useState<Record<string, string>>({});

  const toggleDoctor = (id: string) => {
    setSelectedDoctors((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const handleInputChange = (id: string, value: string) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

const pushToMedicalCertificateDrStepFour = () => {
    navigation.navigate(StackScreens.medicalCertificateDrStepFour);
    console.log("Navigate to Medical Dr Screen 4");
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Medical Examiner Step 3" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>{t('medical_examiner_certificate')}</Text>
        </View>
      
        <View style={styles.form}>
          {/* Doctor Type */}
          <Text style={styles.label}>{t('doctor')} </Text>

          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleDoctor("chiropractor")}>
            <Text style={styles.checkboxBox}>{selectedDoctors.includes("chiropractor") ? "☑️" : "⬜"}</Text>
            <Text style={styles.checkboxLabel}> {t('chiropractor')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleDoctor("physician-assistant")}>
            <Text style={styles.checkboxBox}>{selectedDoctors.includes("physician-assistant") ? "☑️" : "⬜"}</Text>
            <Text style={styles.checkboxLabel}>{t('physician_assistant')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleDoctor("md")}>
            <Text style={styles.checkboxBox}>{selectedDoctors.includes("md") ? "☑️" : "⬜"}</Text>
            <Text style={styles.checkboxLabel}> {t('md')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleDoctor("other")}>
            <Text style={styles.checkboxBox}>{selectedDoctors.includes("other") ? "☑️" : "⬜"}</Text>
            <Text style={styles.checkboxLabel}> {t('other_practitioner')}</Text>
          </TouchableOpacity>

          <View style={styles.lineUnder} />

          <Text style={styles.infoText}>
             {t('if_driver_meets_standards')}
          </Text>

          <Text style={styles.infoText}>
             {t('evaluation_for_certification')}
          </Text>

          <Text style={styles.label}> {t('medical_examiner_name')}</Text>

          <View style={styles.inputBox}>
            <Picker
              selectedValue={inputs["examinerName"] || ""}
              onValueChange={(value) => handleInputChange("examinerName", value)}
              style={{ color: "#555" }}
              mode="dropdown"
            >
              <Picker.Item label="DR. Hung Dat Lai, D.C" value="DR. Hung Dat Lai, D.C" />
              <Picker.Item label="DR. John Doe, M.D" value="DR. John Doe, M.D" />
              <Picker.Item label="Other..." value="Other" />
            </Picker>
          </View> 

          {/* Medical Examiner’s State License, Certificate, or Registration Number */}
          <Text style={styles.label}> {t('medical_examiner_license_number')}</Text>

          {/* Doctor Type Checkboxes Again */}
          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleDoctor("chiropractor")}>
            <Text style={styles.checkboxBox}>{selectedDoctors.includes("chiropractor") ? "☑️" : "⬜"}</Text>
            <Text style={styles.checkboxLabel}>{t('chiropractor')}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleDoctor("physician-assistant")}>
            <Text style={styles.checkboxBox}>{selectedDoctors.includes("physician-assistant") ? "☑️" : "⬜"}</Text>
            <Text style={styles.checkboxLabel}>{t('physician_assistant')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleDoctor("md")}>
            <Text style={styles.checkboxBox}>{selectedDoctors.includes("md") ? "☑️" : "⬜"}</Text>
            <Text style={styles.checkboxLabel}>{t('md')}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.checkboxRow} onPress={() => toggleDoctor("other")}>
            <Text style={styles.checkboxBox}>{selectedDoctors.includes("other") ? "☑️" : "⬜"}</Text>
            <Text style={styles.checkboxLabel}>{t('other_practitioner')}</Text>
          </TouchableOpacity>

          {/* Address, Phone, City, State & ZIP */}
          
          <FormInput placeholder={t('medical_examiner_address')}  />
          
          <FormInput placeholder= {t('medical_examiner_phone')}/>

          <FormInput placeholder= {t('medical_examiner_city')} />
          
          <View style={styles.row}>

            <View style={styles.smallField}>
              <FormInput placeholder={t('state')}/>
            </View>

            <View style={styles.smallField}>
              <FormInput placeholder= {t('zip_code')}/>
            </View>
          </View>
          
          <FormInput 
          placeholder= {t('medical_examiner_license_number')}         
          multiline
          numberOfLines={2} 
          />
          
          <FormInput placeholder= {t('issuing_state')}   />

          <FormInput placeholder={t('national_registry_number')}    />

          <ButtonForm text={t('next')} onPress={pushToMedicalCertificateDrStepFour} />
        </View>
      </ScrollView>
    </View>
  );
}

export default MedicalCertificateDrStepThreeLayout; 