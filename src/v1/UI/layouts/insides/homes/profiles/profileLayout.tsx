import styles from "src/assets/styles/tabStyles/homeStyles/profileStyles/profile.styles";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StackScreens } from "@/configs/navigations/screens";
import { ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native";
import HeaderTabs from "../../../../components/Header";

import { firestore } from "firebase/firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

type ProfileType = {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  driverLicense: string;
  state: string;
  birthDate: string;
  expirationDate: string;
  address: string;
};

const ProfileLayout = (): React.JSX.Element => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          console.log("No user logged in");
          setLoading(false);
          return;
        }

        const userRef = doc(firestore, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setProfile(userSnap.data() as ProfileType);
        } else {
          console.log("No profile found in Firestore");
        }
      } catch (error) {
        console.error("Fetch profile error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderTabs title="Profile" showBack />

      <View style={styles.cardWrapper}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <Text style={styles.greeting}>Hi</Text>
            <Text style={styles.name}>{profile?.fullName || "User"}</Text>
            <View style={styles.separator} />

            <View style={styles.contactRow}>
              <Text style={styles.email}>{profile?.email}</Text>
              <Text style={styles.phone}>{profile?.phone}</Text>
            </View>

            <Text style={styles.sectionGroupText}>
              {profile?.company || "No company"}
            </Text>
            <View style={styles.line} />

            <View style={styles.row}>
              <View style={styles.underlinedBox}>
                <Text style={styles.pairText}>
                  {profile?.driverLicense || "N/A"}
                </Text>
              </View>

              <View style={styles.underlinedBox}>
                <Text style={styles.pairText}>
                  {profile?.state || "N/A"}
                </Text>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.underlinedBox}>
                <Text style={styles.pairText}>
                  {profile?.birthDate || "N/A"}
                </Text>
              </View>

              <View style={styles.underlinedBox}>
                <Text style={styles.pairText}>
                  {profile?.expirationDate || "N/A"}
                </Text>
              </View>
            </View>

            <Text style={styles.sectionGroupText}>
              {profile?.address || "No address"}
            </Text>
            <View style={styles.line} />

            <Text style={styles.sectionGroupText}>Note</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity
            style={styles.changePassBtn}
            onPress={() => navigation.navigate(StackScreens.changePassword)}
          >
            <Text style={styles.changePassText}>
              {t("change_password")}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileLayout;
