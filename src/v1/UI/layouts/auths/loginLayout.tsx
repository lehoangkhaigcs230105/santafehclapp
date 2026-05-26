import styles from "../../../../assets/styles/authStyles/login.style";
import { AuthContext } from "../../../logics/contexts/AuthContext";
import { showAlert } from "../../../logics/services/AlertService";
import {
  getAppLanguage,
  setAppLanguage,
} from "../../../logics/services/LanguageService";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import "../../../../configs/translates/i18net";

import ButtonForm from "../../components/ButtonForm";
import FormInput from "../../components/FormInput";
import { StackScreens } from "src/configs/navigations/screens";

const LoginLayout: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorInput, setErrorInput] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const authState = useContext(AuthContext);
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [selectedLang, setSelectedLang] = useState("en");
  const [showLang, setShowLang] = useState(false);

  /* ================= VALIDATION ================= */

  const validateLogin = () => {
    let valid = true;

    setErrorInput("");
    setErrorPassword("");

    if (!inputValue.trim()) {
      setErrorInput("Vui lòng nhập Email hoặc Driver License");
      valid = false;
    }

    if (!password.trim()) {
      setErrorPassword("Vui lòng nhập mật khẩu");
      valid = false;
    }

    if (inputValue.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue)) {
        setErrorInput("Email không hợp lệ");
        valid = false;
      }
    }

    return valid;
  };

  /* ================= LOGIN ================= */

  const handleLogin = async () => {
    if (!validateLogin()) return;
    if (!authState) return;

    try {
      setLoading(true);

      let response;

      if (inputValue.includes("@")) {
        response = await authState.logIn({
          email: inputValue,
          password,
        });
      } else {
        response = await authState.logIn({
          driverLicense: inputValue,
          password,
        });
      }

      console.log("LOGIN RESPONSE:", response);

      if (!response?.success) {
        showAlert("Lỗi đăng nhập", "Sai email hoặc mật khẩu!");
      }
    } catch (error) {
      console.log("Login Error:", error);
      showAlert("Lỗi đăng nhập", "Có lỗi xảy ra!");
    } finally {
      setLoading(false);
    }
  };

  /* ================= LANGUAGE ================= */

  useEffect(() => {
    (async () => {
      const lang = await getAppLanguage();
      setSelectedLang(lang);
    })();
  }, []);

  const handleChange = async (lang: string) => {
    setSelectedLang(lang);
    await setAppLanguage(lang);
    setShowLang(false);
  };

  /* ================= NAVIGATION ================= */

  const handleSignUp = () => navigation.navigate(StackScreens.register);
  const handleForgotPassword = () =>
    navigation.navigate(StackScreens.forgotPassword);

  /* ================= UI ================= */

  return (
    <View style={styles.container}>
      <View style={styles.languageButton}>
        <TouchableOpacity onPress={() => setShowLang((v) => !v)}>
          <FontAwesome name="language" size={24} color="black" />
        </TouchableOpacity>

        {showLang && (
          <View style={styles.languageButtonAfterClick}>
            {[
              ["vi", "🇻🇳 Tiếng Việt"],
              ["en", "🇺🇸 English"],
              ["zh", "🇨🇳 中文"],
              ["kr", "🇰🇷 한국어"],
              ["es", "🇪🇸 Español"],
            ].map(([code, label]) => (
              <TouchableOpacity
                key={code}
                onPress={() => handleChange(code)}
                style={styles.languageOption}
              >
                <Text style={styles.languageText}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <Text style={styles.title}>{t("loginButton")}</Text>

      <FormInput
        placeholder="Nhập Email hoặc Driver License"
        value={inputValue}
        onChangeText={(text) => {
          setInputValue(text);
          setErrorInput("");
        }}
        autoCapitalize="none"
        iconRight={<Ionicons name="person-outline" size={20} color="#888" />}
        error={errorInput}
      />

      <FormInput
        placeholder={t("password")}
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setErrorPassword("");
        }}
        secureTextEntry={!showPassword}
        iconRight={
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={20}
              color="#888"
            />
          </TouchableOpacity>
        }
        error={errorPassword}
      />

      <View style={styles.changeScreen}>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassText}>
            {t("forgot_password")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signupText}>
            {t("sign_up")}?
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <ButtonForm
          onPress={handleLogin}
          text={t("loginButton")}
          disabled={!inputValue.trim() || !password.trim()}
        />
      )}
    </View>
  );
};

export default LoginLayout;
