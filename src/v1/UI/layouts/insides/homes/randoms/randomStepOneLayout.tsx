import { firestore } from "firebase/firebaseConfig";
import styles from "src/assets/styles/tabStyles/homeStyles/randomStyles/randomStepOne.styles";

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { collection, getDocs } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

import HeaderTabs from "../../../../components/Header";
import FormInput from "../../../../components/FormInput";
import { StackScreens } from "@/configs/navigations/screens";

/* TYPE */
type CompanyType = {
  id: string;
  name: string;
};

const RandomStepOneLayout = () => {
  const { t } = useTranslation();

  // ✅ bỏ any, dùng generic đơn giản
  const navigation = useNavigation<any>();

  const [companyList, setCompanyList] = useState<CompanyType[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /* LOAD COMPANY */
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const snapshot = await getDocs(
          collection(firestore, "companies")
        );

        const companies: CompanyType[] = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            name: String(doc.data().name ?? "").trim(),
          }))
          .filter((item) => item.name)
          .sort((a, b) => a.name.localeCompare(b.name));

        setCompanyList(companies);
      } catch (error) {
        console.error("Error fetching companies:", error);
        Alert.alert("Error", "Không thể tải danh sách company!");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  /* NAVIGATION */
  const handleSelectCompany = (company: string) => {
    navigation.navigate(StackScreens.randomStepTwo, { company }); // ✅ FIX giống style bạn
    console.log("Navigate to Random Step Two");
  };

  const filteredCompanies = companyList.filter((item) =>
    item.name.toLowerCase().includes(search.trim().toLowerCase())
  );

  return (
    <View style={styles.container}>
      <HeaderTabs title="Random Step 1" showBack />

      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.content}>
          <View style={styles.heroCard}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>Step 1 of 2</Text>
            </View>
            <Text style={styles.sectionTitle}>Select Company</Text>
            <Text style={styles.helperText}>
              Choose the company for this random form. We will carry that selection into the submission screen.
            </Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.label}>{t("company_name")}</Text>
            <FormInput
              placeholder={t("search")}
              value={search}
              onChangeText={setSearch}
              autoCapitalize="none"
            />

            {loading ? (
              <ActivityIndicator
                size="large"
                color="#1d5c46"
                style={styles.loading}
              />
            ) : (
              <View style={styles.listContainer}>
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((item) => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.companyCard}
                      onPress={() => handleSelectCompany(item.name)}
                    >
                      <Text style={styles.companyText}>{item.name}</Text>
                      <Text style={styles.companyHint}>Tap to continue</Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <View style={styles.emptyState}>
                    <Text style={styles.emptyTitle}>No company found</Text>
                    <Text style={styles.emptyText}>
                      Try another search keyword or add companies in Firestore first.
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default RandomStepOneLayout;
