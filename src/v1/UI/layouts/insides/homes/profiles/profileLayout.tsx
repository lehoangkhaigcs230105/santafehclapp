import styles from "src/assets/styles/tabStyles/homeStyles/profileStyles/profile.styles";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { StackScreens } from "@/configs/navigations/screens";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HeaderTabs from "../../../../components/Header";
import { AuthContext } from "@/v1/logics/contexts/AuthContext";

const ProfileLayout = (): React.JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const authState = useContext(AuthContext);

  const profile = authState?.profile ?? null;
  const isLoading = authState?.initializing;

  const displayName = useMemo(() => {
    const fullName = String(profile?.fullName ?? "").trim();
    if (fullName) return fullName;

    const firstName = String(profile?.firstName ?? "").trim();
    const lastName = String(profile?.lastName ?? "").trim();
    const joinedName = `${firstName} ${lastName}`.trim();
    return joinedName || "User";
  }, [profile?.firstName, profile?.fullName, profile?.lastName]);

  const email = String(profile?.email ?? "").trim() || "No email";
  const phone = String(profile?.phoneNumber ?? profile?.phone ?? "").trim() || "No phone";
  const company =
    String(profile?.companyName ?? profile?.company ?? "").trim() ||
    "No company assigned";
  const driverLicense =
    String(profile?.driverLicense ?? profile?.license ?? "").trim() || "N/A";
  const state = String(profile?.state ?? "").trim() || "N/A";
  const birthDate =
    String(profile?.dateOfBirth ?? profile?.birthDate ?? "").trim() || "N/A";
  const expirationDate =
    String(profile?.expireOfDriverLicense ?? profile?.expirationDate ?? "").trim() ||
    "N/A";
  const address = String(profile?.address ?? "").trim() || "No address added";
  const city = String(profile?.city ?? "").trim() || "N/A";
  const note = String(profile?.note ?? "").trim() || "No notes added yet";
  const role = String(profile?.role ?? profile?.userRole ?? "user").trim() || "user";

  const infoCards = [
    {
      label: t("driver_license_number"),
      value: driverLicense,
      icon: "card-outline" as const,
    },
    {
      label: t("driver_state"),
      value: state,
      icon: "location-outline" as const,
    },
    {
      label: t("date_of_birth"),
      value: birthDate,
      icon: "calendar-outline" as const,
    },
    {
      label: t("expire_day"),
      value: expirationDate,
      icon: "time-outline" as const,
    },
  ];

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centeredState]}>
        <ActivityIndicator size="large" color="#174d52" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderTabs title="Profile" showBack />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{displayName.charAt(0).toUpperCase()}</Text>
          </View>

          <View style={styles.heroTextWrap}>
            <Text style={styles.eyebrow}>Account overview</Text>
            <Text style={styles.name}>{displayName}</Text>
            <Text style={styles.subText}>{company}</Text>
          </View>

          <View style={styles.roleBadge}>
            <Text style={styles.roleBadgeText}>{role}</Text>
          </View>
        </View>

        <View style={styles.contactCard}>
          <View style={styles.contactRow}>
            <Ionicons name="mail-outline" size={18} color="#174d52" />
            <Text style={styles.contactText}>{email}</Text>
          </View>
          <View style={styles.contactRow}>
            <Ionicons name="call-outline" size={18} color="#174d52" />
            <Text style={styles.contactText}>{phone}</Text>
          </View>
          <View style={styles.contactRow}>
            <Ionicons name="business-outline" size={18} color="#174d52" />
            <Text style={styles.contactText}>{company}</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Driver details</Text>
          <Text style={styles.sectionHint}>Synced from Firebase</Text>
        </View>

        <View style={styles.infoGrid}>
          {infoCards.map((item) => (
            <View key={item.label} style={styles.infoCard}>
              <View style={styles.infoIconWrap}>
                <Ionicons name={item.icon} size={18} color="#174d52" />
              </View>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionCardTitle}>{t("driver_address")}</Text>
          <Text style={styles.sectionCardValue}>{address}</Text>
          <Text style={styles.sectionCardMeta}>{city}</Text>
        </View>

        <View style={styles.sectionCard}>
          <Text style={styles.sectionCardTitle}>{t("note")}</Text>
          <Text style={styles.sectionCardValue}>{note}</Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.88}
          style={styles.changePassBtn}
          onPress={() => navigation.navigate(StackScreens.changePassword)}
        >
          <Ionicons name="lock-closed-outline" size={18} color="#ffffff" />
          <Text style={styles.changePassText}>{t("change_password")}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileLayout;
