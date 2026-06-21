import styles from "../../../../assets/styles/authStyles/login.style";
import { AuthContext } from "../../../logics/contexts/AuthContext";
import { showAlert } from "../../../logics/services/AlertService";
import {
  applySavedLanguage,
  getAppLanguage,
  setAppLanguage,
} from "../../../logics/services/LanguageService";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import "../../../../configs/translates/i18net";

import ButtonForm from "../../components/ButtonForm";
import FormInput from "../../components/FormInput";
import { StackScreens } from "src/configs/navigations/screens";

const LANGUAGE_OPTIONS = [
  ["vi", "Vietnamese"],
  ["en", "English"],
  ["zh", "Chinese"],
  ["kr", "Korean"],
  ["es", "Spanish"],
] as const;

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

  const isReadyToSubmit = useMemo(
    () => inputValue.trim().length > 0 && password.trim().length > 0,
    [inputValue, password]
  );

  const validateLogin = () => {
    let valid = true;

    setErrorInput("");
    setErrorPassword("");

    if (!inputValue.trim()) {
      setErrorInput("Please enter Email or Driver License");
      valid = false;
    }

    if (!password.trim()) {
      setErrorPassword("Please enter your password");
      valid = false;
    }

    if (inputValue.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(inputValue.trim())) {
        setErrorInput("Email is not valid");
        valid = false;
      }
    }

    return valid;
  };

  const handleLogin = async () => {
    if (!validateLogin()) return;
    if (!authState) return;

    try {
      setLoading(true);

      const response = inputValue.includes("@")
        ? await authState.logIn({ email: inputValue.trim(), password })
        : await authState.logIn({ driverLicense: inputValue.trim(), password });

      if (!response?.success) {
        showAlert("Login failed", "Wrong email, driver license, or password.");
      }
    } catch (error) {
      console.log("Login Error:", error);
      showAlert("Login failed", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      const lang = await applySavedLanguage();
      setSelectedLang(lang);
    })();
  }, []);

  const handleChange = async (lang: string) => {
    setSelectedLang(lang);
    await setAppLanguage(lang);
    setShowLang(false);
  };

  const handleSignUp = () => navigation.navigate(StackScreens.register);
  const handleForgotPassword = () =>
    navigation.navigate(StackScreens.forgotPassword);

  const currentLanguageLabel =
    LANGUAGE_OPTIONS.find(([code]) => code === selectedLang)?.[1] ?? "English";

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <ScrollView
        bounces={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <View style={styles.heroTopRow}>
            <View style={styles.brandBadge}>
              <Text style={styles.brandBadgeText}>SF Clinic</Text>
            </View>

            <View style={styles.languageButton}>
              <TouchableOpacity
                activeOpacity={0.88}
                onPress={() => setShowLang((value) => !value)}
                style={styles.languageTrigger}
              >
                <FontAwesome name="language" size={18} color="#174d52" />
                <Text style={styles.languageTriggerText}>{currentLanguageLabel}</Text>
                <Ionicons
                  name={showLang ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#174d52"
                />
              </TouchableOpacity>

              {showLang && (
                <View style={styles.languageDropdown}>
                  {LANGUAGE_OPTIONS.map(([code, label]) => {
                    const active = selectedLang === code;

                    return (
                      <TouchableOpacity
                        key={code}
                        onPress={() => handleChange(code)}
                        style={styles.languageOption}
                      >
                        <Text style={[styles.languageText, active && styles.languageTextActive]}>
                          {label}
                        </Text>
                        {active && (
                          <Ionicons name="checkmark" size={16} color="#174d52" />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </View>
          </View>

          <Text style={styles.eyebrow}>Mobile workflow access</Text>
          <Text style={styles.title}>Sign in to continue your clinic workflow</Text>
          <Text style={styles.subtitle}>
            Use your email or driver license to access forms, employer data, and
            medical workflows in one place.
          </Text>
        </View>

        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>{t("loginButton")}</Text>
            <Text style={styles.formHint}>Secure account access</Text>
          </View>

          <FormInput
            placeholder="Email or Driver License"
            value={inputValue}
            onChangeText={(text) => {
              setInputValue(text);
              setErrorInput("");
            }}
            autoCapitalize="none"
            iconRight={<Ionicons name="person-outline" size={20} color="#6b7f82" />}
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
              <TouchableOpacity onPress={() => setShowPassword((value) => !value)}>
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#6b7f82"
                />
              </TouchableOpacity>
            }
            error={errorPassword}
          />

          <View style={styles.linkRow}>
            <TouchableOpacity onPress={handleForgotPassword}>
              <Text style={styles.linkPrimary}>{t("forgot_password")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSignUp}>
              <Text style={styles.linkSecondary}>{t("sign_up")}</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#174d52" style={styles.loader} />
          ) : (
            <ButtonForm
              onPress={handleLogin}
              text={t("loginButton")}
              disabled={!isReadyToSubmit}
              style={styles.submitButton}
            />
          )}

          <View style={styles.infoRow}>
            <View style={styles.infoChip}>
              <Ionicons name="shield-checkmark-outline" size={16} color="#174d52" />
              <Text style={styles.infoChipText}>Protected login</Text>
            </View>
            <View style={styles.infoChip}>
              <Ionicons name="document-text-outline" size={16} color="#174d52" />
              <Text style={styles.infoChipText}>Form access</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginLayout;
