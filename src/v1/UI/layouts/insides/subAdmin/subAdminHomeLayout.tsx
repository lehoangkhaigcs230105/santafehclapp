import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import SignOutIcon from "@/assets/icons/svg/signOut";
import UserIcon from "@/assets/icons/svg/user";
import styles from "@/assets/styles/tabStyles/subAdminStyles/subAdminHome.styles";
import {
  CLINIC_FORM_PERMISSIONS,
  getAllowedForms,
} from "@/configs/formPermissions";
import { StackScreens } from "@/configs/navigations/screens";
import { AuthContext, AuthUserProfile } from "@/v1/logics/contexts/AuthContext";
import { db } from "firebase/firebaseConfig";

const SubAdminHomeLayout = (): React.JSX.Element | null => {
  const authState = useContext(AuthContext);
  const navigation = useNavigation<any>();
  const [liveProfile, setLiveProfile] = useState<AuthUserProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  useEffect(() => {
    if (!authState?.user?.uid) {
      setLoadingProfile(false);
      return;
    }

    const unsub = onSnapshot(doc(db, "users", authState.user.uid), (snapshot) => {
      if (snapshot.exists()) {
        setLiveProfile(snapshot.data() as AuthUserProfile);
      }
      setLoadingProfile(false);
    });

    return () => unsub();
  }, [authState?.user?.uid]);

  const profile = liveProfile ?? authState?.profile ?? null;
  const displayName =
    profile?.fullName ||
    `${profile?.firstName ?? ""} ${profile?.lastName ?? ""}`.trim() ||
    "Sub Admin";

  const visibleForms = useMemo(() => {
    const allowedForms = getAllowedForms(profile?.allowedForms);

    return CLINIC_FORM_PERMISSIONS.filter((form) =>
      allowedForms.includes(form.id)
    );
  }, [profile?.allowedForms]);

  if (!authState) return null;

  const signOut = () => {
    Alert.alert("Confirm logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign out",
        style: "destructive",
        onPress: async () => {
          await authState.logOut();
        },
      },
    ]);
  };

  const goToProfile = () => {
    navigation.navigate(StackScreens.profile);
  };

  const goToForm = (routeName: string, params?: Record<string, string>) => {
    navigation.navigate(routeName, params);
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
            <Text style={styles.headerTitle}>Sub Admin</Text>
          </View>

          <TouchableOpacity style={styles.iconButton} onPress={signOut}>
            <SignOutIcon width={20} height={20} />
          </TouchableOpacity>
        </View>

        <Text style={styles.welcomeText}>Good day, {displayName}</Text>
        <Text style={styles.welcomeSubText}>
          These are the clinic workflows assigned to your account by the main
          admin.
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, styles.summaryPrimary]}>
            <Text style={styles.summaryValue}>{visibleForms.length}</Text>
            <Text style={styles.summaryLabel}>Assigned forms</Text>
          </View>
          <View style={[styles.summaryCard, styles.summarySecondary]}>
            <Text style={styles.summaryValue}>
              <Ionicons name="shield-checkmark-outline" size={21} />
            </Text>
            <Text style={styles.summaryLabel}>Permission based access</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your forms</Text>
          <Text style={styles.sectionHint}>Tap to open</Text>
        </View>

        {loadingProfile ? (
          <ActivityIndicator size="large" color="#1c6f73" />
        ) : visibleForms.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No forms assigned</Text>
            <Text style={styles.emptyText}>
              Please contact the main admin to enable form access for this
              subadmin account.
            </Text>
          </View>
        ) : (
          <View style={styles.formGrid}>
            {visibleForms.map((form) => (
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
        )}
      </ScrollView>
    </View>
  );
};

export default SubAdminHomeLayout;
