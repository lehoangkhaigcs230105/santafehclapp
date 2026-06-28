import { Ionicons } from "@expo/vector-icons";
import { CommonActions, useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Alert, ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

import styles from "@/assets/styles/tabStyles/adminStyles/adminManageSubAccounts.styles";
import { CLINIC_FORM_PERMISSIONS, FormPermissionId } from "@/configs/formPermissions";
import { StackScreens } from "@/configs/navigations/screens";
import { AuthContext } from "@/v1/logics/contexts/AuthContext";
import {
  SubAdminAccount,
  subscribeToSubAdminAccounts,
  updateSubAdminAllowedForms,
} from "@/v1/logics/services/subAdminAccount.service";

const getDisplayName = (account: SubAdminAccount) => {
  const fallbackName = [account.firstName, account.lastName].filter(Boolean).join(" ");
  return account.fullName || fallbackName || account.email || "Sub admin";
};

const getInitials = (account: SubAdminAccount) => {
  const name = getDisplayName(account);
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return initials || "SA";
};

const AdminManageSubAccountsLayout = (): React.JSX.Element => {
  const navigation = useNavigation<any>();
  const authState = useContext(AuthContext);
  const [accounts, setAccounts] = useState<SubAdminAccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [draftAllowedForms, setDraftAllowedForms] = useState<FormPermissionId[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const selectedAccount = useMemo(
    () => accounts.find((account) => account.id === selectedAccountId) ?? null,
    [accounts, selectedAccountId]
  );

  useEffect(() => {
    if (!authState?.user?.uid) {
      setLoading(false);
      return;
    }

    setLoading(true);

    const unsubscribe = subscribeToSubAdminAccounts(
      authState.user.uid,
      (nextAccounts) => {
        setAccounts(nextAccounts);
        setLoading(false);

        if (!selectedAccountId && nextAccounts.length > 0) {
          setSelectedAccountId(nextAccounts[0].id);
          setDraftAllowedForms(nextAccounts[0].allowedForms);
        }
      },
      () => {
        setLoading(false);
        Alert.alert("Error", "Cannot load sub admin accounts right now.");
      }
    );

    return unsubscribe;
  }, [authState?.user?.uid, selectedAccountId]);

  useEffect(() => {
    if (!selectedAccount) {
      return;
    }

    setDraftAllowedForms(selectedAccount.allowedForms);
  }, [selectedAccount?.id]);

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

  const selectAccount = (account: SubAdminAccount) => {
    setSelectedAccountId(account.id);
    setDraftAllowedForms(account.allowedForms);
  };

  const toggleForm = (formId: FormPermissionId) => {
    setDraftAllowedForms((current) =>
      current.includes(formId)
        ? current.filter((item) => item !== formId)
        : [...current, formId]
    );
  };

  const savePermissions = async () => {
    if (!selectedAccount) {
      return;
    }

    try {
      setSaving(true);
      await updateSubAdminAllowedForms(selectedAccount.id, draftAllowedForms);
      Alert.alert("Success", "Sub admin permissions updated.");
    } catch (error) {
      console.log("Update sub admin permissions error:", error);
      Alert.alert("Error", "Cannot update sub admin permissions right now.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={22} color="#ffffff" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate(StackScreens.adminCreateSubAccount)}
            style={styles.iconButton}
          >
            <Ionicons name="person-add-outline" size={22} color="#ffffff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Manage sub accounts</Text>
        <Text style={styles.headerSubtitle}>
          Review staff accounts and update which clinic forms each sub admin can open.
        </Text>
      </View>

      {loading ? (
        <View style={styles.loadingWrap}>
          <ActivityIndicator size="large" color="#1c6f73" />
        </View>
      ) : accounts.length === 0 ? (
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.emptyCard}>
            <Ionicons name="people-outline" size={34} color="#1c6f73" />
            <Text style={styles.emptyTitle}>No sub admin accounts yet</Text>
            <Text style={styles.emptyText}>
              Create a sub account first, then come back here to manage form permissions.
            </Text>
          </View>
        </ScrollView>
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {accounts.map((account) => {
            const isSelected = account.id === selectedAccountId;

            return (
              <View
                key={account.id}
                style={[styles.accountCard, isSelected && styles.accountCardActive]}
              >
                <TouchableOpacity
                  activeOpacity={0.86}
                  onPress={() => selectAccount(account)}
                  style={styles.accountButton}
                >
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{getInitials(account)}</Text>
                  </View>
                  <View style={styles.accountInfo}>
                    <Text style={styles.accountName}>{getDisplayName(account)}</Text>
                    <Text style={styles.accountEmail}>{account.email || "No email"}</Text>
                    <Text style={styles.permissionCount}>
                      {account.allowedForms.length} forms enabled
                    </Text>
                  </View>
                  <Ionicons
                    name={isSelected ? "chevron-up" : "chevron-down"}
                    size={22}
                    color="#789093"
                  />
                </TouchableOpacity>

                {isSelected && (
                  <View style={styles.editor}>
                    <Text style={styles.editorTitle}>Edit form permissions</Text>
                    <View style={styles.permissionGrid}>
                      {CLINIC_FORM_PERMISSIONS.map((form) => {
                        const isActive = draftAllowedForms.includes(form.id);

                        return (
                          <TouchableOpacity
                            activeOpacity={0.86}
                            key={form.id}
                            onPress={() => toggleForm(form.id)}
                            style={[
                              styles.permissionCard,
                              isActive && styles.permissionCardActive,
                            ]}
                          >
                            <Image
                              resizeMode="contain"
                              source={form.iconSource}
                              style={styles.permissionIcon}
                            />
                            <View style={styles.permissionTextWrap}>
                              <Text style={styles.permissionTitle}>{form.label}</Text>
                              <Text style={styles.permissionDescription}>{form.description}</Text>
                            </View>
                            {isActive && (
                              <View style={styles.checkBadge}>
                                <Ionicons name="checkmark" size={14} color="#ffffff" />
                              </View>
                            )}
                          </TouchableOpacity>
                        );
                      })}
                    </View>

                    <TouchableOpacity
                      activeOpacity={0.88}
                      disabled={saving}
                      onPress={savePermissions}
                      style={[styles.saveButton, saving && styles.saveButtonDisabled]}
                    >
                      {saving ? (
                        <ActivityIndicator color="#ffffff" />
                      ) : (
                        <>
                          <Ionicons name="save-outline" size={20} color="#ffffff" />
                          <Text style={styles.saveText}>Save permissions</Text>
                        </>
                      )}
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default AdminManageSubAccountsLayout;
