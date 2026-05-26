import styles from "../../../../assets/styles/authStyles/register.style";
import { AuthContext } from "../../../logics/contexts/AuthContext";
import { ProfileDTO } from "../../../logics/data/DTO/authDTOs/ProfileDTO";
import { showAlert } from "../../../logics/services/AlertService";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native"; // ✅ FIX
import ButtonForm from "../../components/ButtonForm";
import FormInput from "../../components/FormInput";
import { StackScreens } from "src/configs/navigations/screens";

const RegisterLayout: React.FC = () => {
  const { t } = useTranslation();
  const authState = useContext(AuthContext);
  const navigation = useNavigation<any>(); // ✅ FIX

  /* ================= STATE ================= */
  const [driverLicense, setDriverLicense] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  /* ================= VALIDATE ================= */
  const validateRegister = () => {
    if (!driverLicense.trim()) {
      showAlert("Lỗi", "Vui lòng nhập số bằng lái xe!");
      return false;
    }
    if (!email.trim()) {
      showAlert("Lỗi", "Vui lòng nhập email!");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert("Lỗi", "Email không hợp lệ!");
      return false;
    }

    if (!phoneNumber.trim()) {
      showAlert("Lỗi", "Vui lòng nhập số điện thoại!");
      return false;
    }
    if (!firstName.trim()) {
      showAlert("Lỗi", "Vui lòng nhập tên!");
      return false;
    }
    if (!lastName.trim()) {
      showAlert("Lỗi", "Vui lòng nhập họ!");
      return false;
    }
    if (!password.trim()) {
      showAlert("Lỗi", "Vui lòng nhập mật khẩu!");
      return false;
    }
    if (password.length < 6) {
      showAlert("Lỗi", "Mật khẩu phải có ít nhất 6 ký tự!");
      return false;
    }
    if (password !== confirmPassword) {
      showAlert("Lỗi", "Mật khẩu xác nhận không khớp!");
      return false;
    }

    return true;
  };

  /* ================= REGISTER ================= */
  const handleRegister = async () => {
    if (!validateRegister()) return;

    const registerObject: ProfileDTO = {
      driverLicense,
      phoneNumber,
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    };

    try {
      await authState.register(registerObject);
    } catch (error) {
      showAlert(
        "Đăng ký thất bại",
        error instanceof Error ? error.message : "Lỗi không xác định"
      );
    }
  };

  /* ================= NAV ================= */
  const handleBackLogin = () => {
    navigation.replace(StackScreens.login); // ✅ FIX QUAN TRỌNG
  };

  /* ================= UI ================= */
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Register</Text>

        <View style={styles.form}>
          <FormInput
            placeholder={t("driver_license_number")}
            value={driverLicense}
            onChangeText={setDriverLicense}
            iconRight={
              <Ionicons
                name="card-outline"
                size={20}
                color="#888"
                style={styles.inputIcon}
              />
            }
          />

          <FormInput
            placeholder={t("email")}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
          />

          <FormInput
            placeholder={t("phone_numbers")}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />

          <FormInput
            placeholder={t("driver_first_name")}
            value={firstName}
            onChangeText={setFirstName}
          />

          <FormInput
            placeholder={t("driver_last_name")}
            value={lastName}
            onChangeText={setLastName}
          />

          <FormInput
            placeholder={t("password")}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoComplete="off"
            textContentType={Platform.OS === "ios" ? "oneTimeCode" : undefined}
            iconRight={
              <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#888"
                  style={styles.inputIcon}
                />
              </TouchableOpacity>
            }
          />

          <FormInput
            placeholder={t("confirm_password")}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            autoComplete="off"
            textContentType={Platform.OS === "ios" ? "oneTimeCode" : undefined}
            iconRight={
              <TouchableOpacity
                onPress={() => setShowConfirmPassword((v) => !v)}
              >
                <Ionicons
                  name={
                    showConfirmPassword
                      ? "eye-off-outline"
                      : "eye-outline"
                  }
                  size={20}
                  color="#888"
                  style={styles.inputIcon}
                />
              </TouchableOpacity>
            }
          />

          <TouchableOpacity style={styles.loginBtn} onPress={handleBackLogin}>
            <Text style={styles.haveAccountText}>
              {t("already_have_account")}
            </Text>
          </TouchableOpacity>

          <ButtonForm onPress={handleRegister} text={t("sign_up")} />
        </View>
      </ScrollView>
    </View>
  );
};

export default RegisterLayout;
