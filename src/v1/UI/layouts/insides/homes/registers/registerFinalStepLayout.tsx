import styles from "src/assets/styles/tabStyles/homeStyles/registerStyles/registerFinalStep.styles";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import ButtonForm from "../../../../components/ButtonForm";
import FormInput from "../../../../components/FormInput";
import HeaderTabs from "../../../../components/Header";
import UploadPickerField, {
  SelectedUploadFile,
} from "../../../../components/UploadPickerField";

import { StackScreens } from "@/configs/navigations/screens";
import {
  completeDriverRegister,
  resendDriverRegisterToJotform,
} from "@/v1/logics/services/driverRegister.service";

const RegisterFinalStepLayout = () => {
  const { t } = useTranslation();
  const navigation: any = useNavigation();

  const [witness, setWitness] = useState("");
  const [signDate, setSignDate] = useState("");
  const [clinicSignatureOptional, setClinicSignatureOptional] = useState("");
  const [initialsFile, setInitialsFile] = useState<SelectedUploadFile | null>(null);
  const [memberSignatureFile, setMemberSignatureFile] = useState<SelectedUploadFile | null>(null);
  const [clinicSignatureFile, setClinicSignatureFile] = useState<SelectedUploadFile | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [resending, setResending] = useState(false);

  const pushToHomeScreen = async () => {
    if (!witness.trim() || !signDate.trim()) {
      Alert.alert("Error", "Please complete witness and sign date");
      return;
    }

    try {
      setSubmitting(true);
      const result = await completeDriverRegister({
        witness,
        signDate,
        clinicSignatureOptional,
        completed: true,
      });

      const statusTitle =
        result.jotformStatus === "submitted"
          ? "Submitted to Jotform"
          : result.jotformStatus === "queued"
            ? "Saved to Firebase Only"
            : "Saved";

      const statusMessage =
        result.jotformStatus === "submitted"
          ? "Register saved to Firebase and sent to Jotform successfully."
          : result.jotformStatus === "queued"
            ? "Register saved to Firebase. Jotform sync is processing in the background, so please verify it shortly in Jotform Tables."
            : result.jotformMessage;

      Alert.alert(statusTitle, statusMessage, [
        {
          text: "OK",
          onPress: () => navigation.navigate(StackScreens.home),
        },
      ]);
    } catch (error) {
      console.error("Final step error:", error);
      Alert.alert("Error", "Cannot submit register");
    } finally {
      setSubmitting(false);
    }
  };

  const handleResendToJotform = async () => {
    try {
      setResending(true);
      const result = await resendDriverRegisterToJotform();

      const statusTitle =
        result.jotformStatus === "submitted"
          ? "Submitted to Jotform"
          : result.jotformStatus === "queued"
            ? "Saved to Firebase Only"
            : "Saved";

      const statusMessage =
        result.jotformStatus === "submitted"
          ? "The existing register was sent to Jotform successfully."
          : result.jotformStatus === "queued"
            ? "The register still could not reach Jotform. It remains saved in Firebase."
            : result.jotformMessage;

      Alert.alert(statusTitle, statusMessage);
    } catch (error) {
      console.error("Resend to Jotform error:", error);
      Alert.alert("Error", "Cannot resend this register to Jotform");
    } finally {
      setResending(false);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderTabs title="Register Final Step" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.form}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 3 of 3</Text>
            </View>
            <Text style={styles.sectionTitle}>Review and Sign</Text>
            <Text style={styles.helperText}>
              Upload any final signatures or supporting files, then complete the registration.
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>{t("initial_read_sections")}</Text>
            <UploadPickerField
              buttonText={t("upload_photo")}
              hint="Upload initials or acknowledgement"
              allowedTypes={["application/pdf", "image/*"]}
              file={initialsFile}
              onChange={setInitialsFile}
            />

            <Text style={styles.label}>{t("member_signature")}</Text>
            <UploadPickerField
              buttonText={t("upload_photo")}
              hint="Member signature image or PDF"
              allowedTypes={["application/pdf", "image/*"]}
              file={memberSignatureFile}
              onChange={setMemberSignatureFile}
            />

            <FormInput
              placeholder={t("witness")}
              value={witness}
              onChangeText={setWitness}
            />
            <FormInput
              placeholder={t("sign_date")}
              value={signDate}
              onChangeText={setSignDate}
            />
            <FormInput
              placeholder={t("clinic_signature_optional")}
              value={clinicSignatureOptional}
              onChangeText={setClinicSignatureOptional}
            />

            <UploadPickerField
              buttonText={t("upload_photo")}
              hint="Clinic signature if available"
              allowedTypes={["application/pdf", "image/*"]}
              file={clinicSignatureFile}
              onChange={setClinicSignatureFile}
            />

            <View style={{ gap: 12 }}>
              <ButtonForm
                onPress={pushToHomeScreen}
                text={submitting ? "Submitting..." : t("submit")}
              />

              <TouchableOpacity
                activeOpacity={0.85}
                disabled={resending}
                onPress={handleResendToJotform}
                style={{
                  alignItems: "center",
                  backgroundColor: "#eef4f3",
                  borderColor: "#d5e4e1",
                  borderRadius: 12,
                  borderWidth: 1,
                  justifyContent: "center",
                  minHeight: 52,
                  paddingHorizontal: 16,
                }}
              >
                {resending ? (
                  <ActivityIndicator color="#1d5c46" />
                ) : (
                  <Text
                    style={{
                      color: "#1d5c46",
                      fontSize: 15,
                      fontWeight: "700",
                    }}
                  >
                    Resend to Jotform
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterFinalStepLayout;
