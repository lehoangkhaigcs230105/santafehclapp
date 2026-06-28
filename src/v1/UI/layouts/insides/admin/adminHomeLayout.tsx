import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import styles from "@/assets/styles/tabStyles/adminStyles/admin.Styles";
import { CLINIC_FORM_PERMISSIONS } from "@/configs/formPermissions";
import { StackScreens } from "@/configs/navigations/screens";
import SignOutIcon from "@/assets/icons/svg/signOut";
import UserIcon from "@/assets/icons/svg/user";
import { AuthContext } from "@/v1/logics/contexts/AuthContext";

const AdminHomeLayout = (): React.JSX.Element => {
  const authState = useContext(AuthContext);
  const navigation = useNavigation<any>();

  const fallbackName = [
    authState?.profile?.firstName,
    authState?.profile?.lastName,
  ]
    .filter(Boolean)
    .join(" ");
  const adminName = authState?.profile?.fullName || fallbackName || "Clinic Admin";

  const signOut = () => {
    Alert.alert("Confirm logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          await authState?.logOut();
        },
      },
    ]);
  };

  const goToForm = (routeName: string, params?: Record<string, string>) => {
    navigation.navigate(routeName, params);
  };

  const goToCreateSubAccount = () => {
    navigation.navigate(StackScreens.adminCreateSubAccount);
  };

  const goToManageSubAccounts = () => {
    navigation.navigate(StackScreens.adminManageSubAccounts);
  };

  const goToProfileReview = () => {
    navigation.navigate(StackScreens.adminProfileCheck);
  };

  const goToProfile = () => {
    navigation.navigate(StackScreens.profile);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.iconButton} onPress={goToProfile}>
            <UserIcon width={23} height={23} />
          </TouchableOpacity>

          <View style={styles.headerTitleWrap}>
            <Text style={styles.headerEyebrow}>SF Clinic</Text>
            <Text style={styles.headerTitle}>Admin Dashboard</Text>
          </View>

          <TouchableOpacity style={styles.iconButton} onPress={signOut}>
            <SignOutIcon width={20} height={20} />
          </TouchableOpacity>
        </View>

        <View style={styles.welcomeBlock}>
          <View style={styles.roleBadge}>
            <Ionicons name="shield-checkmark-outline" size={14} color="#dff8f3" />
            <Text style={styles.roleBadgeText}>Main admin</Text>
          </View>
          <Text style={styles.welcomeText}>Good day, {adminName}</Text>
          <Text style={styles.welcomeSubText}>
            Manage staff permissions, review submissions, and open clinic forms.
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={goToCreateSubAccount}
          style={styles.primaryAction}
        >
          <View style={styles.primaryActionIcon}>
            <Ionicons name="person-add-outline" size={24} color="#ffffff" />
          </View>
          <View style={styles.primaryActionBody}>
            <Text style={styles.primaryActionTitle}>Create sub account</Text>
            <Text style={styles.primaryActionText}>
              Add staff and choose exactly which forms they can use.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#ffffff" />
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={goToManageSubAccounts}
          style={[styles.primaryAction, { backgroundColor: "#244b64", marginTop: 12, minHeight: 82 }]}
        >
          <View style={styles.primaryActionIcon}>
            <Ionicons name="people-outline" size={24} color="#ffffff" />
          </View>
          <View style={styles.primaryActionBody}>
            <Text style={styles.primaryActionTitle}>Manage sub accounts</Text>
            <Text style={styles.primaryActionText}>
              Review staff accounts and update exactly which forms they can access.
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={22} color="#ffffff" />
        </TouchableOpacity>

        <View style={styles.shortcutRow}>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={goToProfileReview}
            style={styles.shortcutButton}
          >
            <View style={styles.shortcutIconReview}>
              <MaterialCommunityIcons
                name="clipboard-search-outline"
                size={22}
                color="#1d5f66"
              />
            </View>
            <Text style={styles.shortcutTitle}>Profile review</Text>
            <Text style={styles.shortcutText}>Check patient records</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={goToProfile}
            style={styles.shortcutButton}
          >
            <View style={styles.shortcutIconProfile}>
              <Ionicons name="person-circle-outline" size={23} color="#7a4a12" />
            </View>
            <Text style={styles.shortcutTitle}>My profile</Text>
            <Text style={styles.shortcutText}>Account information</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{CLINIC_FORM_PERMISSIONS.length}</Text>
            <Text style={styles.statLabel}>Available forms</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>Live</Text>
            <Text style={styles.statLabel}>Permission control</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Clinic workflows</Text>
            <Text style={styles.sectionSubtitle}>Open any form as admin</Text>
          </View>
          <Text style={styles.sectionCount}>{CLINIC_FORM_PERMISSIONS.length}</Text>
        </View>

        <View style={styles.formList}>
          {CLINIC_FORM_PERMISSIONS.map((form) => (
            <TouchableOpacity
              activeOpacity={0.86}
              key={form.id}
              onPress={() => goToForm(form.routeName, form.params)}
              style={styles.formRow}
            >
              <View style={styles.formIconWrap}>
                <Image
                  resizeMode="contain"
                  source={form.iconSource}
                  style={styles.formIcon}
                />
              </View>
              <View style={styles.formTextWrap}>
                <Text style={styles.formTitle}>{form.label}</Text>
                <Text style={styles.formDescription}>{form.description}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#789093" />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default AdminHomeLayout;
