import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
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

  const adminName =
    authState?.profile?.fullName ||
    `${authState?.profile?.firstName ?? ""} ${
      authState?.profile?.lastName ?? ""
    }`.trim() ||
    "Clinic Admin";

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

  const goToProfileReview = () => {
    navigation.navigate(StackScreens.adminProfileCheck);
  };

  const goToProfile = () => {
    navigation.navigate(StackScreens.profile);
  };

  return (
    <SafeAreaView style={styles.container}>
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

        <Text style={styles.welcomeText}>Good day, {adminName}</Text>
        <Text style={styles.welcomeSubText}>
          Manage clinic workflows, staff permissions, and patient form intake.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.actionRow}>
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={goToCreateSubAccount}
            style={[styles.primaryAction, styles.actionCard]}
          >
            <View style={styles.actionIcon}>
              <Ionicons name="person-add-outline" size={22} color="#ffffff" />
            </View>
            <View style={styles.actionTextWrap}>
              <Text style={styles.primaryActionTitle}>Create sub account</Text>
              <Text style={styles.primaryActionText}>
                Assign exact form access to staff
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.88}
            onPress={goToProfileReview}
            style={[styles.secondaryAction, styles.actionCard]}
          >
            <View style={styles.secondaryActionIcon}>
              <MaterialCommunityIcons
                name="clipboard-search-outline"
                size={22}
                color="#1d5f66"
              />
            </View>
            <View style={styles.actionTextWrap}>
              <Text style={styles.secondaryActionTitle}>Profile review</Text>
              <Text style={styles.secondaryActionText}>
                Review submitted patient records
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statCardBlue]}>
            <Text style={styles.statValue}>{CLINIC_FORM_PERMISSIONS.length}</Text>
            <Text style={styles.statLabel}>Clinic forms</Text>
          </View>
          <View style={[styles.statCard, styles.statCardGreen]}>
            <Text style={styles.statValue}>Role</Text>
            <Text style={styles.statLabel}>Admin access</Text>
          </View>
          <View style={[styles.statCard, styles.statCardCoral]}>
            <Text style={styles.statValue}>Live</Text>
            <Text style={styles.statLabel}>Form control</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Clinic workflows</Text>
          <Text style={styles.sectionHint}>Tap to open a form</Text>
        </View>

        <View style={styles.formGrid}>
          {CLINIC_FORM_PERMISSIONS.map((form) => (
            <TouchableOpacity
              activeOpacity={0.86}
              key={form.id}
              onPress={() => goToForm(form.routeName, form.params)}
              style={styles.formCard}
            >
              <View style={styles.formIconWrap}>
                <Image
                  resizeMode="contain"
                  source={form.iconSource}
                  style={styles.formIcon}
                />
              </View>
              <Text style={styles.formTitle}>{form.label}</Text>
              <Text style={styles.formDescription}>{form.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminHomeLayout;
