import React, { useContext, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

import { doc, onSnapshot } from "firebase/firestore";
import { db } from "firebase/firebaseConfig";

import styles from "@/assets/styles/tabStyles/homeStyles/home.styles";
import { StackScreens } from "@/configs/navigations/screens";
import HomeButton from "@/v1/UI/components/homeComponents/HomeButtonForm";
import { IconURI } from "@/assets/icons/icon";
import { AuthContext } from "@/v1/logics/contexts/AuthContext";
import { showAlert } from "@/v1/logics/services/AlertService";

const HomeLayout = () => {
  const navigation: any = useNavigation();
  const { t } = useTranslation();
  const authContext = useContext(AuthContext);

  const [profile, setProfile] = useState<any>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);

  if (!authContext) return null;

  const { user, logOut } = authContext;

  useEffect(() => {
    if (!user?.uid) {
      setLoadingProfile(false);
      return;
    }

    const userRef = doc(db, "users", user.uid);

    const unsub = onSnapshot(userRef, (snapshot) => {
      if (snapshot.exists()) {
        setProfile(snapshot.data());
      }
      setLoadingProfile(false);
    });

    return () => unsub();
  }, [user?.uid]);

  const signOut = () => {
    showAlert("Confirm logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign out", style: "destructive", onPress: logOut },
    ]);
  };

  const firstName = useMemo(() => {
    if (profile?.firstName) return profile.firstName;
    if (profile?.fullName) return String(profile.fullName).split(" ")[0];
    return "Driver";
  }, [profile]);

  const companyLabel = profile?.company || profile?.companyName || t("company_name");
  const licenseLabel = profile?.driverLicense || profile?.license || "Not added yet";

  const quickActions = [
    {
      key: "profile",
      title: "Profile",
      text: "Review your account and saved driver details.",
      onPress: () => navigation.navigate(StackScreens.profile),
    },
    {
      key: "employer",
      title: "Employer",
      text: "Open the employer form and manage company records.",
      onPress: () => navigation.navigate(StackScreens.employer),
    },
  ];

  const formActions = [
    { key: "renew", text: t("renew"), iconSource: IconURI.renew, onPress: () => navigation.navigate(StackScreens.renewStepOne) },
    { key: "register", text: t("register"), iconSource: IconURI.register, onPress: () => navigation.navigate(StackScreens.registerStepOne) },
    { key: "term", text: t("term"), iconSource: IconURI.term, onPress: () => navigation.navigate(StackScreens.term) },
    { key: "drug", text: t("drug_test_only"), iconSource: IconURI.drug, onPress: () => navigation.navigate(StackScreens.drugTestStepOne) },
    { key: "returnDuty", text: t("return_to_duty"), iconSource: IconURI.returnDuty, onPress: () => navigation.navigate(StackScreens.returnDutyStepOne) },
    { key: "followUp", text: t("follow_up"), iconSource: IconURI.followUp, onPress: () => navigation.navigate(StackScreens.followUpStepOne) },
    { key: "hair", text: t("hair_test"), iconSource: IconURI.hair, onPress: () => navigation.navigate(StackScreens.hairTestStepOne) },
    { key: "random", text: t("random_test"), iconSource: IconURI.random, onPress: () => navigation.navigate(StackScreens.randomStepOne) },
    { key: "medical", text: t("medical"), iconSource: IconURI.medical, onPress: () => navigation.navigate(StackScreens.medicalCertificateStepOne) },
    { key: "medicalDoctor", text: t("medical_doctor"), iconSource: IconURI.medical, onPress: () => navigation.navigate(StackScreens.medicalCertificateDrStepOne) },
    { key: "employerCard", text: t("employer"), iconSource: IconURI.employer, onPress: () => navigation.navigate(StackScreens.employer) },
    { key: "postAccident", text: t("post_accident"), iconSource: IconURI.postAccident, onPress: () => navigation.navigate(StackScreens.postAccidentStepOne) },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate(StackScreens.profile)}>
              <Ionicons name="person-outline" size={22} color="#153a5f" />
            </TouchableOpacity>

            <View style={styles.brandWrap}>
              <Text style={styles.brandEyebrow}>SF Clinic</Text>
              <Text style={styles.brandTitle}>{profile?.fullName ?? "User Dashboard"}</Text>
            </View>

            <TouchableOpacity style={[styles.navButton, styles.navButtonMuted]} onPress={signOut}>
              <Ionicons name="log-out-outline" size={22} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.heroCard}>
            <View style={styles.heroGlowOne} />
            <View style={styles.heroGlowTwo} />
            <Text style={styles.heroLabel}>Welcome back</Text>
            <Text style={styles.heroTitle}>Hi {firstName}, let's keep your forms moving.</Text>
            <Text style={styles.heroSubtitle}>
              Start a workflow, review company details, or jump back into your driver paperwork from one place.
            </Text>

            <View style={styles.heroMetaRow}>
              <View style={styles.heroMetaCard}>
                <Text style={styles.heroMetaLabel}>Company</Text>
                <Text style={styles.heroMetaValue}>{companyLabel}</Text>
              </View>
              <View style={styles.heroMetaCard}>
                <Text style={styles.heroMetaLabel}>License</Text>
                <Text style={styles.heroMetaValue}>{licenseLabel}</Text>
              </View>
            </View>
          </View>
        </View>

        {loadingProfile && <ActivityIndicator size="large" color="#173c63" style={{ marginTop: 8 }} />}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Quick Access</Text>
            <Text style={styles.sectionHint}>Most used</Text>
          </View>

          <View style={styles.quickActions}>
            {quickActions.map((item) => (
              <TouchableOpacity key={item.key} style={styles.quickActionCard} onPress={item.onPress} activeOpacity={0.88}>
                <Text style={styles.quickActionTitle}>{item.title}</Text>
                <Text style={styles.quickActionText}>{item.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Clinic Workflows</Text>
            <Text style={styles.sectionHint}>Choose a form</Text>
          </View>

          <View style={styles.grid}>
            {formActions.map((item) => (
              <HomeButton
                key={item.key}
                onPress={item.onPress}
                iconSource={item.iconSource}
                text={item.text}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeLayout;
