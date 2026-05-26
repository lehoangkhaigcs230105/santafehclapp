import styles from "src/assets/styles/authStyles/forgotPassword.style";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import ButtonForm from "../../components/ButtonForm";
import FormInput from "../../components/FormInput";
import HeaderTabs from "../../components/Header";


const ForgotPasswordLayout: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = () => {
    // Handle password reset logic here
    router.push("/(auths)/smsScreen");
    console.log("Phone:", phoneNumber);
    console.log("New Password:", newPassword);
    console.log("Confirm Password:", confirmPassword);
  };

  return (
    <View style={{flex: 1}}>
      <HeaderTabs title="" showBack />
    <View style={styles.container}>
      <Text style={styles.title}>{t('forgot_password')}</Text>

      <FormInput
        placeholder={t('phone_numbers')}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        iconRight={<Ionicons name="call-outline" size={20} color="#888" />}
      />

      <FormInput
        placeholder= {t('new_password')}
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry={!showNewPassword}
        iconRight={
          <TouchableOpacity onPress={() => setShowNewPassword(v => !v)}>
            <Ionicons
              name={showNewPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        }
      />

      <FormInput
        placeholder= {t('confirm_new_password')}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showConfirmPassword}
        iconRight={
          <TouchableOpacity onPress={() => setShowConfirmPassword(v => !v)}>
            <Ionicons
              name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        }
      />

      <ButtonForm onPress={handleSubmit} text= {t('submit')} />
    </View>
    </View>
  );
};

export default ForgotPasswordLayout;
