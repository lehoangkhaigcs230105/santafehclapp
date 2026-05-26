import styles from "src/assets/styles/tabStyles/homeStyles/profileStyles/changePassword.styles";
import ButtonForm from "src/v1/UI/components/ButtonForm";
import FormInput from "src/v1/UI/components/FormInput";
import HeaderTabs from "src/v1/UI/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StackScreens } from "@/configs/navigations/screens";
import { Text, TouchableOpacity, View } from "react-native";

const ChangePasswordLayout: React.FC = () => {
  const navigation = useNavigation<any>();
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { t } = useTranslation();

  const handleChangePassword = () => {
    // Validate passwords and handle logic
    navigation.navigate(StackScreens.sms);
    
    console.log("Old:", oldPassword);
    console.log("New:", newPassword);
    console.log("Confirm:", confirmPassword);
  };

  return (
    <View style={{ flex: 1 }}>
      <HeaderTabs title="Change  Password" showBack />
    <View style={styles.container}>

      <Text style={styles.title}>{t('change_password')}</Text>

      <FormInput
        placeholder={t('old_password')}
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry={!showOld}
        iconRight={
          <TouchableOpacity onPress={() => setShowOld(v => !v)}>
            <Ionicons
              name={showOld ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        }
      />

      <FormInput
        placeholder={t('new_password')}
        onChangeText={setNewPassword}
        secureTextEntry={!showNew}
        iconRight={
          <TouchableOpacity onPress={() => setShowNew(v => !v)}>
            <Ionicons
              name={showNew ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        }
      />

      <FormInput
        placeholder={t('confirm_new_password')}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry={!showConfirm}
        iconRight={
          <TouchableOpacity onPress={() => setShowConfirm(v => !v)}>
            <Ionicons
              name={showConfirm ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        }
      />

      <ButtonForm onPress={handleChangePassword} text={t('change_password')}  />
        </View>
    </View>
  );
};

export default ChangePasswordLayout;
