import { Ionicons } from "@expo/vector-icons";
import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useContext, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "@/assets/styles/tabStyles/adminStyles/adminCreateSubAccount.styles";
import {
  CLINIC_FORM_PERMISSIONS,
  FormPermissionId,
} from "@/configs/formPermissions";
import { StackScreens } from "@/configs/navigations/screens";
import { AuthContext } from "@/v1/logics/contexts/AuthContext";
import { createSubAccountWithPermissions } from "@/v1/logics/services/firebaseCreateSubAccount.service";

const AdminCreateSubAccountLayout = () => {
  const navigation = useNavigation<any>();
  const authState = useContext(AuthContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [allowedForms, setAllowedForms] = useState<FormPermissionId[]>([]);
  const [loading, setLoading] = useState(false);

  const canSubmit = useMemo(
    () =>
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      password.length >= 6 &&
      allowedForms.length > 0 &&
      !loading,
    [allowedForms.length, email, firstName, lastName, loading, password.length]
  );

  const toggleForm = (formId: FormPermissionId) => {
    setAllowedForms((current) =>
      current.includes(formId)
        ? current.filter((item) => item !== formId)
        : [...current, formId]
    );
  };

  const handleBack = () => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }

    const targetNavigation = navigation.getParent?.() ?? navigation;

    targetNavigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: StackScreens.adminHome }],
      })
    );
  };

  const handleSubmit = async () => {
    if (!authState?.user?.uid) {
      Alert.alert("Error", "Admin session not found. Please login again.");
      return;
    }

    if (!canSubmit) {
      Alert.alert(
        "Missing information",
        "Please enter all required fields, use a password with at least 6 characters, and select at least one form."
      );
      return;
    }

    try {
      setLoading(true);

      await createSubAccountWithPermissions({
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
        allowedForms,
        parentAdminId: authState.user.uid,
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhoneNumber("");
      setPassword("");
      setAllowedForms([]);

      Alert.alert("Success", "Sub account created with selected permissions.");
    } catch (error) {
      console.log("Create sub account error:", error);
      Alert.alert(
        "Create account failed",
        error instanceof Error ? error.message : "Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.iconButton}
          >
            <Ionicons name="arrow-back" size={22} color="#ffffff" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(StackScreens.adminProfileCheck)}
            style={styles.iconButton}
          >
            <Ionicons name="people-outline" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Create sub account</Text>
        <Text style={styles.headerSubtitle}>
          Grant a staff account access only to the clinic forms selected below.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account information</Text>

          <TextInput autoCapitalize="words" onChangeText={setFirstName} placeholder="First name" placeholderTextColor="#7d9194" style={styles.input} value={firstName} />
          <TextInput autoCapitalize="words" onChangeText={setLastName} placeholder="Last name" placeholderTextColor="#7d9194" style={styles.input} value={lastName} />
          <TextInput autoCapitalize="none" keyboardType="email-address" onChangeText={setEmail} placeholder="Email" placeholderTextColor="#7d9194" style={styles.input} value={email} />
          <TextInput keyboardType="phone-pad" onChangeText={setPhoneNumber} placeholder="Phone number" placeholderTextColor="#7d9194" style={styles.input} value={phoneNumber} />
          <TextInput autoCapitalize="none" onChangeText={setPassword} placeholder="Temporary password" placeholderTextColor="#7d9194" secureTextEntry style={styles.input} value={password} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Allowed forms</Text>

          <View style={styles.permissionGrid}>
            {CLINIC_FORM_PERMISSIONS.map((form) => {
              const selected = allowedForms.includes(form.id);

              return (
                <TouchableOpacity
                  activeOpacity={0.86}
                  key={form.id}
                  onPress={() => toggleForm(form.id)}
                  style={[
                    styles.permissionCard,
                    selected && styles.permissionCardActive,
                  ]}
                >
                  <Image resizeMode="contain" source={form.iconSource} style={styles.permissionIcon} />

                  <View style={styles.permissionTextWrap}>
                    <Text style={styles.permissionTitle}>{form.label}</Text>
                    <Text style={styles.permissionDescription}>{form.description}</Text>
                  </View>

                  {selected && (
                    <View style={styles.checkBadge}>
                      <Ionicons name="checkmark" size={14} color="#ffffff" />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.88}
          disabled={!canSubmit}
          onPress={handleSubmit}
          style={[
            styles.submitButton,
            !canSubmit && styles.submitButtonDisabled,
          ]}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <>
              <Ionicons name="person-add-outline" size={20} color="#ffffff" />
              <Text style={styles.submitText}>Create account</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AdminCreateSubAccountLayout;
